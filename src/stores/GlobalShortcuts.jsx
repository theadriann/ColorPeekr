
const {remote}                             = __non_webpack_require__('electron')
const {app, globalShortcut, BrowserWindow} = remote

@Store
export default class GlobalShortcuts {

    Shortcuts =[ {command: 'CommandOrControl+Alt+1',action:  'toggleLock'} ]

    constructor(scope) {
        super()
        this.scope = scope

        this.registerShortcuts()

        window.addEventListener('unload', () => this.dispose())
    }

    get window() {
        return remote.getCurrentWindow()
    }

    action(actionName) {
        switch (actionName) {
        case 'toggleLock':
            this.scope.store.locked = !this.scope.store.locked
            break
        }
    }

    @Bind
    handleShortcut(shortcut, register = false) {
        if (register) {
            globalShortcut.register(shortcut.command, () => {
                this.action(shortcut.action)
            })
        }
        else {
            globalShortcut.unregister(shortcut.command)
        }
    }

    @Bind
    registerShortcuts() {
        _.forEach(this.Shortcuts, shortcut => {
            _.isFunction(shortcut.watch)
                ? this.watch(shortcut.watch, ok => this.handleShortcut(shortcut, ok))
                : this.handleShortcut(shortcut, true)
        })
    }

    @Bind
    unregisterShortcuts() {
        _.each(this.Shortcuts, shortcut => {
            this.handleShortcut(shortcut, false)
        })
    }

    dispose() {
        this.unregisterShortcuts()

        super.dispose()
    }
}
