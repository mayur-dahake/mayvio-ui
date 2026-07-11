// Hash-based router for the Vanilla SPA
export class Router {
  constructor(routes, defaultRoute = '#/home') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.contentEl = document.getElementById('root-content');
    
    window.addEventListener('hashchange', () => this.handleRouteChange());
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = this.defaultRoute;
    } else {
      this.handleRouteChange();
    }
  }

  async handleRouteChange() {
    const hash = window.location.hash;
    const viewPath = this.routes[hash] || this.routes[this.defaultRoute];
    
    if (!viewPath) return;

    try {
      this.contentEl.innerHTML = '<div class="mv-skeleton mv-skeleton--shimmer" style="height: 300px; border-radius: var(--mv-radius-lg);"></div>';
      
      const response = await fetch(viewPath);
      if (!response.ok) throw new Error(`Failed to load view: ${viewPath}`);
      
      const html = await response.text();
      
      // We wrap the component in a nice canvas
      this.contentEl.innerHTML = `
        <div class="playground-canvas">
          ${html}
        </div>
      `;

      // Dispatch event to re-initialize any JS for the loaded components
      document.dispatchEvent(new CustomEvent('viewLoaded', { detail: { hash } }));
      
      this.updateActiveNav(hash);
    } catch (err) {
      console.error(err);
      this.contentEl.innerHTML = `<div class="mv-alert mv-alert--error">Failed to load view.</div>`;
    }
  }

  updateActiveNav(hash) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
      if (a.getAttribute('href') === hash) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
}

export const routes = {
  '#/home': '/views/home.html',
  '#/brand': '/views/brand.html',
  '#/installation': '/views/installation.html',
  
  // Phase 2
  '#/components/tooltip': '/views/components/tooltip.html',
  '#/components/badge': '/views/components/badge.html',
  '#/components/avatar': '/views/components/avatar.html',
  '#/components/alert': '/views/components/alert.html',
  
  // Phase 3
  '#/components/toast': '/views/components/toast.html',
  '#/components/skeleton': '/views/components/skeleton.html',
  '#/components/progress': '/views/components/progress.html',
  '#/components/breadcrumb': '/views/components/breadcrumb.html',
  '#/components/tabs': '/views/components/tabs.html',
  '#/components/accordion': '/views/components/accordion.html',
  
  // Phase 4
  '#/components/interaction-bem': '/views/components/interaction-bem.html',
  '#/components/modal': '/views/components/modal.html',
  '#/components/dropdown': '/views/components/dropdown.html',
  '#/components/multiselect': '/views/components/multiselect.html',
  '#/components/datepicker': '/views/components/datepicker.html',
  '#/components/fileupload': '/views/components/fileupload.html',
  '#/components/palette': '/views/components/palette.html',
  '#/components/sidebar': '/views/components/sidebar.html',
  '#/components/notifications': '/views/components/notifications.html',

  // Phase 5
  '#/components/form-primitives': '/views/components/form-primitives.html',
  
  // Phase 6
  '#/components/datagrid': '/views/components/datagrid.html',
  '#/components/charts': '/views/components/charts.html',
  '#/components/kpi': '/views/components/kpi.html',
  '#/components/widgets': '/views/components/widgets.html',
  '#/components/timeline': '/views/components/timeline.html',
};
