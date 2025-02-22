document.addEventListener('DOMContentLoaded', function() {
    const proxyAddressInput = document.getElementById('proxyAddress');
    const proxyPortInput = document.getElementById('proxyPort');
    const saveBtn = document.getElementById('saveBtn');
  
    // Load saved proxy settings.
    chrome.storage.sync.get(['proxyAddress', 'proxyPort'], function(data) {
      if (data.proxyAddress) {
        proxyAddressInput.value = data.proxyAddress;
      }
      if (data.proxyPort) {
        proxyPortInput.value = data.proxyPort;
      }
    });
  
    // Save the settings when the button is clicked.
    saveBtn.addEventListener('click', function() {
      const address = proxyAddressInput.value;
      const port = parseInt(proxyPortInput.value, 10);
      chrome.storage.sync.set({
        proxyAddress: address,
        proxyPort: port
      }, function() {
        alert("Settings saved.");
      });
    });
  });
  