const fs = require('fs');

const path = '/Volumes/SSD/Projects/UI Projects/mayvio-ui/apps/playground/index.html';
const html = fs.readFileSync(path, 'utf8');

// We need to reorder the components into phase sections.
// But wait, the structure is a bit messy. Some components are in <div class="component-row">.
// It's safer to just tell the user this is a massive change.
