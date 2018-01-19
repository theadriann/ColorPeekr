
// Electron
const {remote}  = __non_webpack_require__('electron')
const appWindow = remote.BrowserWindow.getAllWindows()[0]

// Utils
import namer from 'color-namer'
import tinyjs from 'third_party/tiny'

@Store({ mutable: true })
export default class AppStore {

    @State.byBooleanVal locked = false
    @State.byBooleanVal panelOpen = false
    @State.byBooleanVal activeColor = '#333'

    constructor(state, scope) {
        super(state)

        this.scope = scope

        this.watch(() => this.panelOpen, this.onPanelOpenChange)
    }

    get tinyColor() {
        return tinyjs(this.activeColor)
    }

    get colorName() {
        const names   = _.flatten(_.map(namer(this.tinyColor.getOriginalInput())))
        const ordered = _.orderBy(names, name => parseFloat(name.distance))

        return _.startCase(ordered[0].name)
    }

    get textColor() {
        const luminance = this.tinyColor.getLuminance()

        if (luminance <= .5) {
            return '#fff'
        }

        return '#000'
    }

    @Bind
    onPanelOpenChange(open) {
        appWindow.setSize(250, open ? 200 : 80, false)
    }

    @Task
    setColor(color) {
        this.activeColor = color
    }
}
