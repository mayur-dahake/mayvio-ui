export function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('[data-toggle-sidebar]');
  const links = document.querySelectorAll('.sidebar-link');

  if (!sidebar || !toggle) return;

  const setCollapsed = (collapsed) => {
    sidebar.classList.toggle('is-collapsed', collapsed);
    toggle.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
  };

  toggle.addEventListener('click', () => {
    const collapsed = !sidebar.classList.contains('is-collapsed');
    setCollapsed(collapsed);
  });

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      links.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
}
