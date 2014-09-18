var Menu = require('menu'); // Module to create native menus that can be used as application menu and context menu.
var messageBox = require('./message-box')
var dialog = require('dialog'); // This module provides APIs to show native system dialogs

MainMenu = function(mainWindow) {
  var currentFile = '',

  newFileClick = function(res) {
    console.log('New file...');

    messageBox.modified(mainMenu, function() {

    });
  },

  openFileClick = function(res) {
    console.log('Opening a file...');
    messageBox.modified(mainMenu, function() {

    });
  },

  save = function() {
    console.log('Saving...');
    messageBox.modified(mainMenu, function() {

    });
  },

  this.mainWindow = mainWindow;
  this.menu = null;

  if (process.platform == 'darwin')
    this.template = [
      {
        label: 'hello-app',
        submenu: [{
            label: 'About hello-app',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Atom Shell',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          }],
      },
      {
        label: 'File',
        submenu: [{
          label: 'New',
            accelerator: 'Command+N',
            click: newFileClick
          },
          {
            label: 'Open',
            accelerator: 'Command+O',
            click: openFileClick
          },
          {
            label: 'Save',
            selector: 'save',
            enabled: false,
            accelerator: 'Command+S',
            click: save
          }],
      }
    ];

  this.menu = Menu.buildFromTemplate(this.template);

  if (process.platform == 'darwin')
    Menu.setApplicationMenu(this.menu);

  this.currentFile = currentFile;
  var mainMenu = this;
}

module.exports = MainMenu;
