// Electron Utils
import { BrowserWindow, app } from 'electron'

// Node Utils
import url from 'url'
import path from 'path'

// Load App
app.on('window-all-closed', () => app.quit())
app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        frame: false,
        width: 250,
        height: 80,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            plugins: true
        }
    })

    // mainWindow.openDevTools()
    mainWindow.loadURL(
        url.format({
            pathname: path.resolve(eval('__dirname'), 'index.html'),
            protocol: 'file'
        })
    )
    mainWindow.on('closed', () => (mainWindow = null))
})
