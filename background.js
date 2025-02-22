chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateProxy') {
      if (request.enable) {
        // Set proxy settings using a fixed server
        const config = {
          mode: "fixed_servers",
          rules: {
            singleProxy: {
              scheme: "http",  // Change to "socks5" if needed or extend the UI to select the protocol.
              host: request.address,
              port: request.port
            },
            bypassList: ["<local>"]
          }
        };
  
        chrome.proxy.settings.set(
          { value: config, scope: 'regular' },
          () => {
            console.log("Proxy enabled with config:", config);
          }
        );
  
        // Change the extension icon to green
        chrome.action.setIcon({ path: "./icon_green.png" }, () => {
          if (chrome.runtime.lastError) {
            console.error("Error setting icon:", chrome.runtime.lastError.message);
          }
        });
      } else {
        // Reset to system proxy settings (disable custom proxy)
        const config = { mode: "system" };
  
        chrome.proxy.settings.set(
          { value: config, scope: 'regular' },
          () => {
            console.log("Proxy disabled, using system settings");
          }
        );
  
        // Revert the extension icon to the default gray
        chrome.action.setIcon({ path: "./icon_gray.png" }, () => {
          if (chrome.runtime.lastError) {
            console.error("Error setting icon:", chrome.runtime.lastError.message);
          }
        });
      }
    }
  });
  