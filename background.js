// Service Worker for Archive Browser Extension

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('Archive Browser Extension installed');
    
    // Set default settings
    chrome.storage.sync.set({
        noRedirect: true,
        enableFlash: true,
        blockTracking: true,
        autoFormat: 'wayback'
    });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkSettings') {
        chrome.storage.sync.get(
            ['noRedirect', 'enableFlash', 'blockTracking'],
            (settings) => {
                sendResponse(settings);
            }
        );
        return true;
    }

    if (request.action === 'openUrl') {
        chrome.tabs.create({ url: request.url });
        sendResponse({ success: true });
        return true;
    }

    if (request.action === 'getCurrentTab') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            sendResponse(tabs[0]);
        });
        return true;
    }
});

// Block tracking requests if enabled
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = details.url.toLowerCase();
        
        // List of common tracking domains
        const trackingDomains = [
            'google-analytics.com',
            'googletagmanager.com',
            'facebook.com/tr',
            'connect.facebook.net',
            'doubleclick.net',
            'ads.google.com',
            'pagead2.googlesyndication.com',
            'stats.g.doubleclick.net',
            'analytics.google.com'
        ];

        const shouldBlock = trackingDomains.some(domain => url.includes(domain));
        
        if (shouldBlock) {
            console.log('Blocked tracking request:', url);
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] }
);

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Inject content script
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});
