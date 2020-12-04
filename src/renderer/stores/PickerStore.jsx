// electron
const { remote } = __non_webpack_require__('electron')
const appWindow = remote.BrowserWindow.getAllWindows()[0]

// utils
import namer from 'color-namer'
import tinyjs from 'third_party/tiny'

export default class PickerStore {
    //

    @Observable.ref locked = false
    @Observable.ref panelOpen = false
    @Observable.ref activeColor = '#333'

    @Observable.shallow savedColors = new Set()

    constructor(rootStore) {
        this.store = rootStore

        this.fetchDB()

        mobx.reaction(() => this.panelOpen, this.onPanelOpenChange)
    }

    @Computed
    get allSavedColors() {
        return [...this.savedColors.values()]
    }

    // ------------------------
    // core methods
    // ------------------------

    @Action
    _setColor = (color) => (this.activeColor = color)

    setColor = (color) => requestAnimationFrame(() => this._setColor(color))

    @Action
    setSize(size) {
        appWindow.setSize(250, size, false)
    }

    @Action
    saveColor = () => {
        this.savedColors.add(this.activeColor)
        this.updateDB()
    }

    @Action
    removeColor = (color) => {
        this.savedColors.delete(color)
        this.updateDB()
    }

    @Action
    fetchDB() {
        this.savedColors.clear()

        try {
            const savedColors = JSON.parse(localStorage.getItem('savedColors'))

            for (let color of savedColors) {
                this.savedColors.add(color)
            }
        } catch (e) {
            console.warn(`couldn't find any saved colors`)
        }
    }

    updateDB() {
        try {
            window.localStorage.setItem('savedColors', JSON.stringify(this.allSavedColors))
        } catch (e) {
            console.warn(`couldn't persist-save colors`)
        }
    }

    @Action
    lock() {
        this.locked = true
    }

    @Action
    toggleLocked() {
        this.locked = !this.locked
    }

    @Action
    togglePanelOpen() {
        this.panelOpen = !this.panelOpen
    }

    // ------------------------
    // event handling methods
    // ------------------------

    onPanelOpenChange = (open) => {
        this.setSize(open ? 200 : 80)
    }

    // ------------------------
    // computed data
    // ------------------------

    @Computed
    get tinyColor() {
        return tinycolor(this.activeColor)
    }

    @Computed
    get colorName() {
        const names = _.flatten(_.map(namer(this.tinyColor.getOriginalInput())))
        const ordered = _.orderBy(names, (name) => parseFloat(name.distance))

        return _.startCase(ordered[0].name)
    }

    @Computed
    get textColor() {
        const luminance = this.tinyColor.getLuminance()

        if (luminance <= 0.5) {
            return '#fff'
        }

        return '#000'
    }
}
