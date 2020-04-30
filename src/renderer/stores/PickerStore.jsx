// electron
const { remote } = __non_webpack_require__('electron')
const appWindow = remote.BrowserWindow.getAllWindows()[0]

// utils
import namer from 'color-namer'
import tinyjs from 'third_party/tiny'

export default class PickerStore {
    //

    @Observable locked = false
    @Observable panelOpen = false
    @Observable activeColor = '#333'

    constructor(rootStore) {
        this.store = rootStore

        mobx.reaction(() => this.panelOpen, this.onPanelOpenChange)
    }

    // ------------------------
    // core methods
    // ------------------------

    setColor = (color) => {
        requestAnimationFrame(() => (this.activeColor = color))
    }

    setSize = (size) => {
        appWindow.setSize(250, size, true)
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
    // Event Handlers
    // ------------------------

    onPanelOpenChange = (open) => {
        this.setSize(open ? 200 : 80)
    }

    // ------------------------
    // Computed Data
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
