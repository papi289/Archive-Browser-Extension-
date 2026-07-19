// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    loadSettings();
    updateCurrentPage();
});

// Load settings from storage
async function loadSettings() {
    const settings = await chrome.storage.sync.get({
        noRedirect: true,
        enableFlash: true,
        blockTracking: true,
        autoFormat: ''
    });

    document.getElementById('noRedirect').checked = settings.noRedirect;
    document.getElementById('enableFlash').checked = settings.enableFlash;
    document.getElementById('blockTracking').checked = settings.blockTracking;
    document.getElementById('autoFormat').value = settings.autoFormat;

    // Save on change
    document.getElementById('noRedirect').addEventListener('change', saveSettings);
    document.getElementById('enableFlash').addEventListener('change', saveSettings);
    document.getElementById('blockTracking').addEventListener('change', saveSettings);
    document.getElementById('autoFormat').addEventListener('change', saveSettings);
}

// Save settings
async function saveSettings() {
    const settings = {
        noRedirect: document.getElementById('noRedirect').checked,
        enableFlash: document.getElementById('enableFlash').checked,
        blockTracking: document.getElementById('blockTracking').checked,
        autoFormat: document.getElementById('autoFormat').value
    };

    await chrome.storage.sync.set(settings);
    showStatus('Settings saved!', 'success');
}

// Update current page URL
async function updateCurrentPage() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
        document.getElementById('currentUrl').value = tab.url;
    }
}

// Archive current page
async function archiveCurrentPage() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) {
        showStatus('No page to archive', 'error');
        return;
    }

    const autoFormat = document.getElementById('autoFormat').value;
    let archiveUrl;

    switch (autoFormat) {
        case 'wayback':
            archiveUrl = `https://web.archive.org/web/*/${tab.url}`;
            break;
        case 'archiveIs':
            archiveUrl = `https://archive.is/?url=${encodeURIComponent(tab.url)}`;
            break;
        case 'archiveOrg':
            archiveUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(tab.url)}`;
            break;
        default:
            showStatus('Please select an archive site', 'error');
            return;
    }

    chrome.tabs.create({ url: archiveUrl });
    showStatus('Opening archive...', 'info');
}

// Open archive site
function openArchive(url) {
    chrome.tabs.create({ url: url });
}

// Reload with settings
async function reloadWithSettings() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
        chrome.tabs.reload(tab.id);
        showStatus('Page reloading...', 'info');
    }
}

// Open settings page
function openSettings() {
    chrome.tabs.create({ url: 'options.html' });
}

// Clear cache
async function clearCache() {
    await chrome.storage.local.clear();
    showStatus('Cache cleared!', 'success');
}

// Show status message
function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    
    setTimeout(() => {
        statusEl.className = 'status';
    }, 3000);
}
