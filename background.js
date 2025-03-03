// Function to update the proxy settings and icon based on stored values.
function updateProxyFromStorage() {
  chrome.storage.sync.get(["enableProxy", "proxyAddress", "proxyPort"], (data) => {
    const enabled = data.enableProxy || false;
    if (enabled) {
      // Set proxy settings to use the saved proxy (defaulting if not set).
      const config = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "http", // Change to "socks5" if needed.
            host: data.proxyAddress || "127.0.0.1",
            port: data.proxyPort || 8080
          },
          bypassList: ["<local>"]
        }
      };
      chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
        console.log("Proxy enabled on startup:", config);
      });
      chrome.action.setIcon({ path: "icon_green.png" });
    } else {
      // Revert to system proxy settings.
      const config = { mode: "system" };
      chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
        console.log("Proxy disabled on startup, using system settings");
      });
      chrome.action.setIcon({ path: "icon_gray.png" });
    }
  });
}

// When the extension's service worker starts up (which happens on Chrome startup),
// ensure the proxy state is set correctly.
chrome.runtime.onStartup.addListener(() => {
  updateProxyFromStorage();
});

// Also run the check immediately when the service worker loads.
updateProxyFromStorage();

// Listen for clicks on the extension icon to toggle the proxy state.
chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get(["enableProxy", "proxyAddress", "proxyPort"], (data) => {
    const currentState = data.enableProxy || false;
    const newState = !currentState; // Toggle state

    // Save the new state.
    chrome.storage.sync.set({ enableProxy: newState }, () => {
      if (newState) {
        // Enable the proxy with saved or default settings.
        const config = {
          mode: "fixed_servers",
          rules: {
            singleProxy: {
              scheme: "http", // Change to "socks5" if needed.
              host: data.proxyAddress || "127.0.0.1",
              port: data.proxyPort || 8080
            },
            bypassList: ["<local>"]
          }
        };
        chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
          console.log("Proxy enabled:", config);
        });
        chrome.action.setIcon({ path: "icon_green.png" });
      } else {
        // Disable the proxy by reverting to system settings.
        const config = { mode: "system" };
        chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
          console.log("Proxy disabled, using system settings");
        });
        chrome.action.setIcon({ path: "icon_gray.png" });
      }
    });
  });
});
