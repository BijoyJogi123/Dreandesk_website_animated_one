// 404 Redirect Handler
// This script checks if the current page exists and redirects to 404 if not

(function() {
    // List of valid pages in your website
    const validPages = [
        'index.html',
        'about_us.html',
        'about.html',
        'about_demo.html',
        'Career.html',
        'contact_us.html',
        'For_youth.html',
        'For_education.html',
        'For_corporated.html',
        'initiative.html',
        'footer.html',
        'demo.html',
        'hero-demo-complete.html',
        'hero-demo-complete-v2.html',
        'hero-demo-FINAL.html',
        'hero-demo-PERFECT.html',
        'hero-section-only.html',
        '404.html',
        '' // Root directory
    ];

    // Get current page name from URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Check if we're already on 404 page
    if (currentPage === '404.html') {
        return;
    }

    // Check if current page is in valid pages list
    if (!validPages.includes(currentPage) && currentPage !== '') {
        // Redirect to 404 page
        window.location.href = './404.html';
    }
})();
