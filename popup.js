document.addEventListener('DOMContentLoaded', function() {
    const proxyAddressInput = document.getElementById('proxyAddress');
    const proxyPortInput = document.getElementById('proxyPort');
    const enableProxyCheckbox = document.getElementById('enableProxy');
    const saveBtn = document.getElementById('saveBtn');
  
    // Load saved settings
    chrome.storage.sync.get(['proxyAddress', 'proxyPort', 'enableProxy'], function(data) {
      if (data.proxyAddress) {
        proxyAddressInput.value = data.proxyAddress;
      }
      if (data.proxyPort) {
        proxyPortInput.value = data.proxyPort;
      }
      enableProxyCheckbox.checked = data.enableProxy || false;
    });
  
    saveBtn.addEventListener('click', function() {
      const address = proxyAddressInput.value;
      const port = parseInt(proxyPortInput.value, 10);
      const enable = enableProxyCheckbox.checked;
  
      chrome.storage.sync.set({
        proxyAddress: address,
        proxyPort: port,
        enableProxy: enable
      }, function() {
        // Send message to background service worker to update proxy settings and icon
        chrome.runtime.sendMessage({
          action: 'updateProxy',
          enable: enable,
          address: address,
          port: port
        });
      });
    });
  });
  