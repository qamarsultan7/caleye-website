// Redirect .html URLs to clean URLs
(function() {
    const currentPath = window.location.pathname;

    // Only redirect if the URL ends with .html
    if (currentPath.endsWith('.html')) {
        // Remove .html extension
        const cleanPath = currentPath.replace(/\.html$/, '');
        // Redirect with 301 status (but JavaScript uses location.replace which does a similar function)
        window.location.replace(cleanPath);
    }
})();
