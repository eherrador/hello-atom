(function() {
  var dialog = require('dialog'); // This module provides APIs to show native system dialogs

  exports.modified = function(mainMenu, callback) {
    var messageBoxOptions = {
      type: "warning",
      buttons: ['Save & continue', 'Cancel', 'Continue'],
      message: "Are you sure you want to do this?"
    };

    dialog.showMessageBox(messageBoxOptions, function(res) {
      if (res == 2) callback();
      else if (res == 0) {
        
      }
    });
  }
})();
