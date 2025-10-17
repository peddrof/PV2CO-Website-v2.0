// Simple 404 handler for static sites
(function() {
    'use strict';
    
    // Check if we're on a 404 page
    if (window.location.pathname === '/404.html' || 
        window.location.pathname === '/404' ||
        document.title.includes('404')) {
        return;
    }
    
    // Check if the current page exists by trying to load it
    function checkPageExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }
    
    // Redirect to 404 page if current page doesn't exist
    function handle404() {
        const currentPath = window.location.pathname;
        
        // Skip if it's the main page or a known existing page
        if (currentPath === '/' || 
            currentPath === '/index.html' ||
            currentPath.endsWith('.css') ||
            currentPath.endsWith('.js') ||
            currentPath.endsWith('.png') ||
            currentPath.endsWith('.jpg') ||
            currentPath.endsWith('.jpeg') ||
            currentPath.endsWith('.gif') ||
            currentPath.endsWith('.svg') ||
            currentPath.endsWith('.ico')) {
            return;
        }
        
        // Check if page exists
        checkPageExists(window.location.href).then(exists => {
            if (!exists) {
                // Redirect to 404 page
                window.location.href = '/404.html';
            }
        });
    }
    
    // Run the check after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handle404);
    } else {
        handle404();
    }
})();
