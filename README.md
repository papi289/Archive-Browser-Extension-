# 🗂️ Archive Browser Chrome Extension

A powerful Chrome extension for browsing web archives with **Ruffle Flash 0.3.0 support** and **local link navigation** without automatic redirects to Wayback Machine.

## ✨ Features

- 🔗 **No Redirect Navigation** - Click links on archive sites without auto-redirects
- ⚡ **Ruffle Flash 0.3.0** - Play legacy Flash content on archived pages
- 🌐 **Archive Site Support** - Works with:
  - Wayback Machine (web.archive.org)
  - Archive.is
  - Archive.org
  - Webcitation.org
- 🚫 **Tracking Blocker** - Blocks analytics and tracking scripts
- ⚙️ **Customizable Settings** - Full control over extension behavior
- 📊 **Flash Emulation** - Automatic detection and Ruffle replacement of Flash objects
- 🎯 **Performance Optimized** - Caching and preloading options

## 📦 Installation

### From Chrome Web Store
(Coming soon)

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/papi289/Archive-Browser-Extension-.git
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **"Developer mode"** (toggle in top right)

4. Click **"Load unpacked"** and select the extension folder

5. The extension icon will appear in your Chrome toolbar

## 🚀 Usage

### Basic Usage

1. **Click the extension icon** in your Chrome toolbar to open the popup
2. **Choose an archive site** from the quick links
3. **Browse archive sites** with automatic Flash support
4. **Click links** - they will open in new tabs without redirect

### Settings

Click **⚙️ Settings** in the popup to configure:

- **No Redirect** - Disable auto-redirects on link clicks
- **Enable Flash** - Load Ruffle for Flash content
- **Block Tracking** - Remove analytics scripts
- **Default Archive Site** - Set your preferred archive
- **Ruffle Preload** - Speed up Flash loading
- **Cache Flash Files** - Store Flash content locally
- **Debug Mode** - Enable console logging

## 🎮 Flash Support

The extension automatically:

1. **Detects** Flash objects (`<object>`, `<embed>` tags)
2. **Replaces** them with Ruffle players
3. **Loads** Flash content from archive sites
4. **Monitors** for dynamically added Flash elements

### Supported Flash Content

- Classic Flash animations
- Flash games
- Flash videos
- ActionScript applications

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No tracking of browsing
- ✅ Blocks third-party trackers
- ✅ Local storage only
- ✅ Open source

## 📋 Requirements

- Chrome 88+
- JavaScript enabled
- Internet connection (for Ruffle CDN)

## 🛠️ Technical Details

### Files Structure

```
Archive-Browser-Extension-/
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup UI
├── popup.js               # Popup functionality
├── options.html           # Settings page
├── options.js             # Settings functionality
├── background.js          # Service worker
├── content.js             # DOM manipulation
├── images/                # Extension icons
└── README.md             # This file
```

### Key Technologies

- **Manifest V3** - Latest Chrome extension standard
- **Service Workers** - Background processing
- **Chrome Storage API** - Settings persistence
- **Ruffle.rs** - Flash emulator
- **Web APIs** - DOM manipulation, URL handling

## 🔧 Configuration

### Default Settings

```javascript
{
  noRedirect: true,          // Prevent auto-redirects
  enableFlash: true,         // Load Ruffle Flash
  blockTracking: true,       // Block trackers
  defaultArchive: 'wayback', // Default archive site
  preloadRuffle: true,       // Preload Ruffle
  cacheFlash: true,          // Cache Flash files
  debugMode: false           // Disable debug logging
}
```

### Custom Archive URL

You can set a custom archive URL in settings for alternative archive services.

## 🐛 Troubleshooting

### Flash Not Loading

1. Check that "Enable Flash" is turned on in settings
2. Verify "Preload Ruffle" is enabled
3. Open browser console (F12) to see error messages
4. Enable "Debug Mode" for detailed logging

### Links Redirecting

1. Ensure "No Redirect" is enabled in settings
2. Reload the page (🔄 button in popup)
3. Check if the site is in the archive list

### Slow Performance

1. Enable "Cache Flash Files" in settings
2. Disable "Block Tracking" if it's causing slowness
3. Check internet connection for Ruffle CDN access

## 📞 Support

- 🐛 Report bugs on [GitHub Issues](https://github.com/papi289/Archive-Browser-Extension-/issues)
- 💡 Suggest features in [GitHub Discussions](https://github.com/papi289/Archive-Browser-Extension-/discussions)
- 📚 Read [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)

## 📜 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Version History

### v1.0.0 (Current)
- Initial release
- Ruffle Flash 0.3.0 support
- Local navigation without redirects
- Tracking blocker
- Settings page
- Archive site support

## 🙏 Acknowledgments

- **Ruffle.rs** - Flash emulation engine
- **Chrome Extension API** - Official documentation
- **Archive community** - For preservation efforts

## ⚠️ Disclaimer

This extension is for educational and archival purposes. Respect copyright laws and the terms of service of archive sites.

---

**Made with ❤️ for web archivists and history enthusiasts**
