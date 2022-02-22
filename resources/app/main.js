const { app, protocol, BrowserWindow } = require('electron')
const path = require('path')
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        standard: true,
        secure: true,
        allowServiceWorkers: true,
        supportFetchAPI: true
    }
}]);
function createWindow () {
  const win = new BrowserWindow({
    width: 100,
    height: 100,
    icon:__dirname + 'icon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.minimize()
  
  win.maximize()
  win.setIcon(path.join(__dirname, '/icon.ico'));
  
  win.setMenu(null)
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})