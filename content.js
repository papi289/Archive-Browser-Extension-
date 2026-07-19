// Content script for Archive Browser Extension

console.log('Archive Browser content script loaded');

// Get settings from background
chrome.runtime.sendMessage({ action: 'checkSettings' }, (settings) => {
    if (settings.noRedirect) {
        handleLocalNavigation();
    }
    
    if (settings.enableFlash) {
        loadRuffleFlash();
    }
    
    if (settings.blockTracking) {
        blockTrackingPixels();
    }
});

// Handle local link navigation (no redirect)
function handleLocalNavigation() {
    // Intercept link clicks on archive sites
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Check if it's an archive site
        const isArchiveSite = window.location.hostname.includes('archive.org') ||
                             window.location.hostname.includes('web.archive.org') ||
                             window.location.hostname.includes('archive.is') ||
                             window.location.hostname.includes('webcitation.org');

        if (isArchiveSite) {
            // Prevent default navigation for archive links
            if (href.startsWith('#') || href.includes(window.location.hostname)) {
                // Allow same-site navigation
                return;
            }

            // For cross-origin links, stay within archive
            if (!href.startsWith('http')) {
                link.setAttribute('href', resolveUrl(href));
                return;
            }

            // Prevent external redirects
            console.log('Blocked redirect to:', href);
            e.preventDefault();
            e.stopPropagation();

            // Open in new tab instead
            window.open(href, '_blank');
        }
    }, true);
}

// Resolve relative URLs
function resolveUrl(url) {
    const baseUrl = window.location.href;
    const base = new URL(baseUrl);
    
    if (url.startsWith('/')) {
        return base.origin + url;
    }
    
    return new URL(url, baseUrl).href;
}

// Load Ruffle Flash 0.3.0
function loadRuffleFlash() {
    // Check if Ruffle is already loaded
    if (window.RufflePlayer) {
        console.log('Ruffle already loaded');
        return;
    }

    // Create script to load Ruffle from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/ruffle-rs@0.3.0/dist/ruffle.js';
    script.onload = () => {
        console.log('Ruffle 0.3.0 loaded successfully');
        // Initialize Ruffle player
        window.RufflePlayer = window.RufflePlayer || {};
        window.RufflePlayer.config = {
            polyfills: true,
            allowScriptAccess: false
        };
    };
    script.onerror = () => {
        console.warn('Failed to load Ruffle, trying fallback');
        loadRuffleFallback();
    };
    
    document.head.appendChild(script);
}

// Fallback Ruffle loader
function loadRuffleFallback() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/ruffle-rs@0.3.0/dist/ruffle.js';
    script.onload = () => {
        console.log('Ruffle fallback loaded');
    };
    document.head.appendChild(script);
}

// Block tracking pixels
function blockTrackingPixels() {
    // Remove tracking pixels
    const trackingPixels = document.querySelectorAll('img[src*="pixel"]');
    trackingPixels.forEach(pixel => {
        pixel.style.display = 'none';
        pixel.src = '';
    });

    // Block common tracking domains via style
    const style = document.createElement('style');
    style.textContent = `
        img[src*="doubleclick.net"],
        img[src*="google-analytics"],
        img[src*="facebook.com/tr"],
        img[src*="googletagmanager"],
        iframe[src*="doubleclick.net"],
        iframe[src*="google-analytics"],
        iframe[src*="facebook.com"],
        script[src*="google-analytics"],
        script[src*="googletagmanager"]
        {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
        }
    `;
    document.head.appendChild(style);
}

// Handle Flash objects and embeds
document.addEventListener('DOMContentLoaded', () => {
    // Replace old Flash embeds with Ruffle
    replaceFlashObjects();
});

function replaceFlashObjects() {
    // Replace object tags
    const objects = document.querySelectorAll('object[data*=".swf"], object[type="application/x-shockwave-flash"]');
    objects.forEach(obj => {
        const swfUrl = obj.getAttribute('data') || obj.querySelector('param[name="movie"]')?.getAttribute('value');
        if (swfUrl) {
            const ruffle = document.createElement('ruffle-player');
            ruffle.src = swfUrl;
            ruffle.width = obj.getAttribute('width') || '100%';
            ruffle.height = obj.getAttribute('height') || '100%';
            obj.replaceWith(ruffle);
        }
    });

    // Replace embed tags
    const embeds = document.querySelectorAll('embed[src*=".swf"], embed[type="application/x-shockwave-flash"]');
    embeds.forEach(embed => {
        const ruffle = document.createElement('ruffle-player');
        ruffle.src = embed.getAttribute('src');
        ruffle.width = embed.getAttribute('width') || '100%';
        ruffle.height = embed.getAttribute('height') || '100%';
        embed.replaceWith(ruffle);
    });
}

// Monitor for dynamically added Flash elements
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            replaceFlashObjects();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('Archive Browser content script ready');
