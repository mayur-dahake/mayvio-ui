export function initBreadcrumb() {
  const breadcrumb = document.querySelector('.breadcrumb');
  if (!breadcrumb) return;

  breadcrumb.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !breadcrumb.contains(link)) return;

    event.preventDefault();
    
    // Get all links and the current page indicator
    const allLinks = [...breadcrumb.querySelectorAll('a')];
    const currentPageSpan = breadcrumb.querySelector('[aria-current="page"]');
    const linkIndex = allLinks.indexOf(link);
    
    // Remove aria-current from the current page
    if (currentPageSpan) currentPageSpan.removeAttribute('aria-current');
    
    // Set the clicked link as current page
    link.setAttribute('aria-current', 'page');
    
    // Optional: log the navigation for debugging
    console.log('Navigated to:', link.textContent);
  });
}
