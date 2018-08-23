require('dotenv').config()
import {app, BrowserWindow, Menu} from 'electron'
import * as path from 'path';
import * as url from 'url';

import { installExtensions } from './installExtensions';

let mainWindow: any


function createMainWindow () {
  installExtensions()

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      backgroundThrottling: false,
      textAreasAreResizable: false
      //nodeIntegrationInWorker: true
      //experimentalCanvasFeatures: true
      //experimentalFeatures: true
      }
  })
  
  
  mainWindow.loadURL(url.format({
    pathname: path.join(app.getAppPath(), 'dist/app/app.html'),
    protocol: 'file:',
    slashes: true
  }))


  mainWindow.webContents.openDevTools()


// this adds 'inspect element' on right click in the browser
  mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}
        }
      ]).popup(mainWindow);
    })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createMainWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow()
  }
})


export const fn = () => {
  console.log("Hello from main process!");
  return "Hello from main process!";
};
