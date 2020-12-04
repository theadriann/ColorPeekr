// utils
const { remote } = __non_webpack_require__('electron')
const { app, globalShortcut, BrowserWindow } = remote

export default class GlobalShortcuts {
    //

    Shortcuts = [
        { command: 'CommandOrControl+Alt+1', action: 'toggleLock' },
        { command: 'CommandOrControl+Alt+2', action: 'saveColor' },
    ]

    constructor(rootStore) {
        this.store = rootStore

        this.registerShortcuts()

        window.addEventListener('unload', () => this.dispose())
    }

    get window() {
        return remote.getCurrentWindow()
    }

    action = (actionName) => {
        switch (actionName) {
            case 'toggleLock':
                this.store.picker.toggleLocked()
                break

            case 'saveColor':
                this.store.picker.saveColor()
                break
        }
    }

    handleShortcut = (shortcut, register = false) => {
        if (register) {
            globalShortcut.register(shortcut.command, () => {
                this.action(shortcut.action)
            })
        } else {
            globalShortcut.unregister(shortcut.command)
        }
    }

    registerShortcuts = () => {
        _.forEach(this.Shortcuts, (shortcut) => {
            this.handleShortcut(shortcut, true)
        })
    }

    unregisterShortcuts = () => {
        _.each(this.Shortcuts, (shortcut) => {
            this.handleShortcut(shortcut, false)
        })
    }

    dispose() {
        this.unregisterShortcuts()
    }
}
