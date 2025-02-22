# Local Proxy Bridge

Local Proxy Bridge is a Chrome extension that allows you to toggle your browser’s proxy connection between active and inactive states with a single click. When enabled, the extension routes traffic through a configured local proxy server, and the extension icon turns green. When disabled, it reverts to the system’s default proxy settings and the icon changes back to gray.

## Features

- **Toggle Proxy on Click**: Click the extension icon in your toolbar to switch between enabling and disabling the proxy.
- **Options Page**: Configure the proxy address and port by right-clicking the extension icon and selecting "Options" (or via the Extensions page).
- **Dynamic Icon**: The extension icon visually indicates the state—green when the proxy is active and gray when inactive.
- **Built for Manifest V3**: Uses Chrome’s latest extension APIs, including a background service worker.

## File Structure

```
local-proxy-extension/
├── manifest.json       # Extension metadata and permissions
├── background.js       # Service worker that handles toggle logic
├── options.html        # Options page UI for configuring proxy settings
├── options.js          # Script for managing the options page
├── icon_gray.png       # Default (inactive) icon image
└── icon_green.png      # Active icon image (proxy enabled)
```

## Installation

1. **Clone or Download the Repository**  
   Clone this repository or download the source code as a ZIP file.

2. **Load the Extension in Chrome**  
   - Open Chrome and navigate to `chrome://extensions`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click on **Load unpacked** and select the `local-proxy-extension` folder.

3. **Using the Extension**  
   - **Toggle Proxy:** Simply click the extension icon to toggle between active (proxy enabled) and inactive (proxy disabled) states.
   - **Configure Proxy Settings:** Right-click the extension icon and select **Options**. Enter your desired proxy address and port, then click **Save**.

## Contributing

Contributions, suggestions, and improvements are welcome! Please feel free to open an issue or submit a pull request.

## Disclaimer

This extension is provided "as-is" without any warranty. Use it at your own risk.

## Acknowledgments

This extension was created entirely with the assistance of AI and ChatGPT. Special thanks to the AI community for making innovative development solutions more accessible!

## License

This project is licensed under the [MIT License](LICENSE).