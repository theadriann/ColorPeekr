
// Utils
import tinyjs from 'third_party/tiny'
const robotjs  = __non_webpack_require__('robotjs')
const {remote} = __non_webpack_require__('electron')

// Controllers
import Store from 'app/stores/Store'
import GlobalShortcuts from 'app/stores/GlobalShortcuts'

// Styles
import MainViewLess from './MainView.less'

// Views
import SwatchView from './SwatchView'

@Component
export default class MainView {

    constructor() {
        super()

        this.scope.store     = new Store(this.scope)
        this.scope.shortcuts = new GlobalShortcuts(this.scope)
        this.scope.clipboard = remote.clipboard
    }

    get store() {
        return this.scope.store
    }

    componentDidMount() {
        this.checker = setInterval(() => {
            if (this.store.locked) {
                return
            }

            const mousePos = robotjs.getMousePos()
            const color    = robotjs.getPixelColor(mousePos.x, mousePos.y)

            this.store.setColor(`#${color}`)
        }, 10)
    }

    componentWillUnmount() {
        clearInterval(this.checker)

        super.detached()
    }

    render() {
        return (
            <div
                class={ MainViewLess.container }
                style-color={ this.textColor }
            >
                <SwatchView
                    class={ MainViewLess.swatch }
                    color={ this.store.tinyColor }
                    bind:locked={ this.store.locked }
                    bind:panelOpen={ this.store.panelOpen }
                />
            </div>
        )
    }
}
