//https://developer.chrome.com/docs/extensions/mv3/options/

// Saves options to chrome.storage
function save_options() {
  var setItemStyle = document.getElementById('setItemStyle').value;
  var unqItemStyle = document.getElementById('unqItemStyle').value;
  chrome.storage.sync.set({
    setItemStyle: setItemStyle,
    unqItemStyle: unqItemStyle
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    setItemStyle: '%PURPLE%Grail o %GREEN%%NAME%%BORDER-00%%MAP-0C%',
    unqItemStyle: '%PURPLE%Grail o %GOLD%%NAME%%BORDER-00%%MAP-0C%'
  }, function(items) {
    document.getElementById('setItemStyle').value = items.setItemStyle;
    document.getElementById('unqItemStyle').value = items.unqItemStyle;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);