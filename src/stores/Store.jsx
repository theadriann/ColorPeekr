// Utils
import { reaction } from 'mobx'
import { Computed, Observable } from 'app/decorators'

// Electron
const { remote } = __non_webpack_require__('electron')
const appWindow = remote.BrowserWindow.getAllWindows()[0]

// Utils
import namer from 'color-namer'
import tinyjs from 'third_party/tiny'

export default class AppStore {
    @Observable locked = false
    @Observable panelOpen = false
    @Observable activeColor = '#333'

    constructor(state, scope) {
        this.scope = scope

        reaction(() => this.panelOpen, this.onPanelOpenChange)
    }

    // ------------------------
    // Actions
    // ------------------------

    setColor = color => {
        requestAnimationFrame(() => (this.activeColor = color))
    }

    setSize = size => {
        appWindow.setSize(250, size, false)
    }

    // ------------------------
    // Event Handlers
    // ------------------------

    onPanelOpenChange = open => {
        this.setSize(open ? 200 : 80)
    }

    // ------------------------
    // Computed Data
    // ------------------------

    @Computed
    get tinyColor() {
        return tinyjs(this.activeColor)
    }

    @Computed
    get colorName() {
        const names = _.flatten(_.map(namer(this.tinyColor.getOriginalInput())))
        const ordered = _.orderBy(names, name => parseFloat(name.distance))

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
