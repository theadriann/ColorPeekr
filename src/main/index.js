// utils
const path = require('path')
const robotjs = require('robotjs')
const { app, BrowserWindow, ipcMain } = require('electron')

if (require('electron-squirrel-startup')) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 250,
        height: 80,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
        },
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    // mainWindow.webContents.openDevTools()

    ipcMain.on('get-mouse-pixel', (event, arg) => {
        const mousePos = robotjs.getMousePos()
        const color = robotjs.getPixelColor(mousePos.x, mousePos.y)

        event.reply('get-mouse-pixel', color)
    })
}

app.allowRendererProcessReuse = false

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
