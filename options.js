// Options page script

document.addEventListener('DOMContentLoaded', loadSettings);

async function loadSettings() {
    const settings = await chrome.storage.sync.get({
        noRedirect: true,
        enableFlash: true,
        blockTracking: true,
        defaultArchive: 'wayback',
        customArchiveUrl: '',
        preloadRuffle: true,
        cacheFlash: true,
        debugMode: false
    });

    document.getElementById('noRedirect').checked = settings.noRedirect;
    document.getElementById('enableFlash').checked = settings.enableFlash;
    document.getElementById('blockTracking').checked = settings.blockTracking;
    document.getElementById('defaultArchive').value = settings.defaultArchive;
    document.getElementById('customArchiveUrl').value = settings.customArchiveUrl;
    document.getElementById('preloadRuffle').checked = settings.preloadRuffle;
    document.getElementById('cacheFlash').checked = settings.cacheFlash;
    document.getElementById('debugMode').checked = settings.debugMode;
}

async function saveSettings() {
    const settings = {
        noRedirect: document.getElementById('noRedirect').checked,
        enableFlash: document.getElementById('enableFlash').checked,
        blockTracking: document.getElementById('blockTracking').checked,
        defaultArchive: document.getElementById('defaultArchive').value,
        customArchiveUrl: document.getElementById('customArchiveUrl').value,
        preloadRuffle: document.getElementById('preloadRuffle').checked,
        cacheFlash: document.getElementById('cacheFlash').checked,
        debugMode: document.getElementById('debugMode').checked
    };

    await chrome.storage.sync.set(settings);
    showStatus('✅ Settings saved successfully!', 'success');
}

async function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        await chrome.storage.sync.clear();
        
        const defaultSettings = {
            noRedirect: true,
            enableFlash: true,
            blockTracking: true,
            defaultArchive: 'wayback',
            customArchiveUrl: '',
            preloadRuffle: true,
            cacheFlash: true,
            debugMode: false
        };

        await chrome.storage.sync.set(defaultSettings);
        loadSettings();
        showStatus('✅ Settings reset to defaults!', 'success');
    }
}

function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    
    setTimeout(() => {
        statusEl.className = 'status';
    }, 3000);
}
