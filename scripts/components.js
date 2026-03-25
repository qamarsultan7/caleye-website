// Load reusable header and footer components
async function loadComponents() {
  try {
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isRootPage = !currentPath.includes('/components/');

    const headerPath = './components/header.html';
    const footerPath = './components/footer.html';

    // Load header
    try {
      const headerResponse = await fetch(headerPath);
      if (headerResponse.ok) {
        const headerHTML = await headerResponse.text();
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerHTML;
        // Insert header at the beginning
        document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);
        // Insert mobile menu before main
        if (headerContainer.children.length > 0) {
          const mainElement = document.querySelector('main');
          if (mainElement) {
            mainElement.parentNode.insertBefore(headerContainer.firstElementChild, mainElement);
          }
        }
      }
    } catch (headerError) {
      console.log('Header loading skipped (may be expected in some environments)');
    }

    // Load footer
    try {
      const footerResponse = await fetch(footerPath);
      if (footerResponse.ok) {
        const footerHTML = await footerResponse.text();
        document.body.insertAdjacentHTML('beforeend', footerHTML);
      }
    } catch (footerError) {
      console.log('Footer loading failed:', footerError.message);
    }

    // Re-initialize navbar functionality from main.js if it exists
    if (window.toggleLinkFromNavMenu) {
      // Re-attach event listeners if needed
    }
  } catch (error) {
    console.log('Components loading error:', error.message);
  }
}

// Call when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
