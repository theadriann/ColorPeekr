const { remote } = __non_webpack_require__('electron')
const { app, globalShortcut, BrowserWindow } = remote

export default class GlobalShortcuts {
    Shortcuts = [{ command: 'CommandOrControl+Alt+1', action: 'toggleLock' }]

    constructor(scope) {
        this.scope = scope

        this.registerShortcuts()

        window.addEventListener('unload', () => this.dispose())
    }

    get window() {
        return remote.getCurrentWindow()
    }

    action = actionName => {
        switch (actionName) {
            case 'toggleLock':
                this.scope.store.locked = !this.scope.store.locked
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
        _.forEach(this.Shortcuts, shortcut => {
            _.isFunction(shortcut.watch)
                ? this.watch(shortcut.watch, ok => this.handleShortcut(shortcut, ok))
                : this.handleShortcut(shortcut, true)
        })
    }

    unregisterShortcuts = () => {
        _.each(this.Shortcuts, shortcut => {
            this.handleShortcut(shortcut, false)
        })
    }

    dispose() {
        this.unregisterShortcuts()
    }
}
