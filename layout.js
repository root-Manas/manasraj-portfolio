/**
 * Dynamic Layout Draftsman
 * Calculates exact header height and updates CSS variables for perfect spacing.
 */

function updateLayout() {
    const header = document.querySelector('header');
    if (!header) return;

    // Get exact height including borders/padding
    const headerHeight = header.offsetHeight;

    // Set CSS variable on root
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    // Debug log
    console.log('Layout updated: Header height set to', headerHeight);
}

// Run on load
window.addEventListener('load', updateLayout);

// Run on resize (throttled)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateLayout, 100);
});

// Run immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLayout);
} else {
    updateLayout();
}
