var app = require('app');  // Module to control application life.
var Menu = require('menu'); // Module to create native menus that can be used as application menu and context menu.
var MenuItem = require('menu-item');
var ipc = require('ipc');
var MainMenu = require('./main-menu');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var dialog = require('dialog');
var Tray = require('tray');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var appIcon = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Build window menu
  var mainMenu = new MainMenu(mainWindow);
  var confirmToClose = false;

  mainWindow.on('close', function(event) {
    if (confirmToClose) {
      event.preventDefault();

      var currentWindow = mainWindow
        , messageBoxOptions = { type: "warning",
                                buttons: ['Save & Quit', 'Cancel', 'Quit'],
                                message: "Are you sure you want to quit?" };

      dialog.showMessageBox(messageBoxOptions, function(res) {
        if (res == 2) {
          confirmToClose = false;
          mainWindow.close();
        } else if (res == 0) {
          mainMenu.save(function() {
            confirmToClose = false;
            mainWindow.close();
          });
        }
      });
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
