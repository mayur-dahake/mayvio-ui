const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const indexPath = path.join(__dirname, '../index.html');
const viewsDir = path.join(__dirname, '../views');
const componentsDir = path.join(viewsDir, 'components');

if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

const html = fs.readFileSync(indexPath, 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// We will extract all elements inside .components wrapper.
// Currently it is organized by .tier-section.
// Each .tier-section contains multiple .component-card or manual HTML blocks.
const componentsContainer = document.querySelector('.components');
if (!componentsContainer) {
  console.log("Could not find .components");
  process.exit(1);
}

// We want to create one HTML file per component.
// We can find all elements with aria-labelledby or custom wrappers.
// Let's create a map of component keys (e.g. "button", "modal") to their HTML.
const viewsMap = {
  'modal': document.querySelector('[aria-labelledby="modal-heading"]')?.outerHTML,
  'dropdown': document.querySelector('[aria-labelledby="dropdown-heading"]')?.outerHTML,
  'multiselect': document.querySelector('[aria-labelledby="multiselect-heading"]')?.outerHTML,
  'datepicker': document.querySelector('[aria-labelledby="datepicker-heading"]')?.outerHTML,
  'fileupload': document.querySelector('[aria-labelledby="fileupload-heading"]')?.outerHTML,
  'palette': document.querySelector('[aria-labelledby="palette-heading"]')?.outerHTML,
  'sidebar': document.querySelector('[aria-labelledby="sidebar-heading"]')?.outerHTML,
  'notifications': document.querySelector('[aria-labelledby="notifications-heading"]')?.outerHTML,
  'toast': document.querySelector('[aria-labelledby="toast-heading"]')?.outerHTML,
  'skeleton': document.querySelector('[aria-labelledby="skeleton-heading"]')?.outerHTML,
  'progress': document.querySelector('[aria-labelledby="progress-heading"]')?.outerHTML,
  'breadcrumb': document.querySelector('[aria-labelledby="breadcrumb-heading"]')?.outerHTML,
  'tabs': document.querySelector('[aria-labelledby="tabs-heading"]')?.outerHTML,
  'accordion': document.querySelector('[aria-labelledby="accordion-heading"]')?.outerHTML,
  'tooltip': document.querySelector('[aria-labelledby="tooltip-heading"]')?.outerHTML,
  'badge': document.querySelector('[aria-labelledby="badge-heading"]')?.outerHTML,
  'avatar': document.querySelector('[aria-labelledby="avatar-heading"]')?.outerHTML,
  'alert': document.querySelector('[aria-labelledby="alert-heading"]')?.outerHTML,
  'datagrid': document.querySelector('[aria-labelledby="datagrid-heading"]')?.outerHTML,
  'charts': document.querySelector('[aria-labelledby="charts-heading"]')?.outerHTML,
  'kpi': document.querySelector('[aria-labelledby="kpi-heading"]')?.outerHTML,
  'widgets': document.querySelector('[aria-labelledby="widgets-heading"]')?.outerHTML,
  'timeline': document.querySelector('[aria-labelledby="timeline-heading"]')?.outerHTML,
  'form-primitives': document.querySelector('.tier-section h2:contains("Tier 5")')?.parentElement?.outerHTML // we'll use a hack if needed
};

// Custom Phase 5 (Form Primitives) block extraction
const tierSections = Array.from(document.querySelectorAll('.tier-section'));
const formPrimitivesSection = tierSections.find(sec => sec.innerHTML.includes('Phase 5: Form Primitives'));
if (formPrimitivesSection) {
  viewsMap['form-primitives'] = formPrimitivesSection.outerHTML;
}

// Custom Phase 4 new BEM block extraction
const phase4Custom = document.querySelector('[aria-labelledby="phase4-heading"]');
if (phase4Custom) {
  // Let's just bundle the new BEM Modal and Dropdown as part of their respective files later, or keep them as 'interaction-bem'
  viewsMap['interaction-bem'] = phase4Custom.outerHTML;
}

for (const [key, content] of Object.entries(viewsMap)) {
  if (content) {
    fs.writeFileSync(path.join(componentsDir, `${key}.html`), content, 'utf8');
    console.log(`Extracted view: ${key}.html`);
  } else {
    console.log(`Warning: Could not find content for ${key}`);
  }
}

// Write a home.html view containing the stats and header content
const statsSection = document.querySelector('.hero');
if (statsSection) {
  fs.writeFileSync(path.join(viewsDir, `home.html`), statsSection.outerHTML, 'utf8');
  console.log(`Extracted view: home.html`);
}
