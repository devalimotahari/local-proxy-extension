chrome.action.onClicked.addListener(() => {
  // Get current state and proxy settings from storage.
  chrome.storage.sync.get(["enableProxy", "proxyAddress", "proxyPort"], (data) => {
    let currentState = data.enableProxy || false;
    let newState = !currentState; // Toggle state
    
    // Save the new state.
    chrome.storage.sync.set({ enableProxy: newState }, () => {
      if (newState) {
        // If enabling, use saved proxy settings or defaults.
        const config = {
          mode: "fixed_servers",
          rules: {
            singleProxy: {
              scheme: "http",  // Change to "socks5" if needed.
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
        // If disabling, revert to system settings.
        const config = { mode: "system" };
        chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
          console.log("Proxy disabled, using system settings");
        });
        chrome.action.setIcon({ path: "icon_gray.png" });
      }
    });
  });
});
