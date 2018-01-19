
// Styles
import SwatchViewLess from './SwatchView.less'

// Views
import ClipboardButton from './ClipboardButton'

@Component({ fork: true })
export default class SwatchView {

    @Attribute locked = false
    @Attribute panelOpen = false

    constructor() {
        super()

        this.scope.defineObservable('hovered', null)
    }

    get store() {
        return this.scope.store
    }

    toggleLocked() {
        this.locked = !this.locked
    }

    togglePanel() {
        this.panelOpen = !this.panelOpen
    }

    render() {
        return (
            <div
                class={ SwatchViewLess.container }
                style-backgroundColor={ this.store.tinyColor }
                style-color={ this.store.textColor }
                { ...this.undeclaredAttributes() }
            >
                { this.renderTopbar() }
                <if condition={ this.panelOpen }>
                    { this.renderContent() }
                </if>
                { this.renderBottombar() }
            </div>
        )
    }

    renderTopbar() {
        return (
            <div class="top-bar">
                <div class="title">
                    <i
                        class="fa"
                        class-fa-lock={ this.locked }
                        class-fa-unlock={ !this.locked }
                        aria-hidden="true"
                        onClick={ () => this.toggleLocked() }
                    />
                    { this.store.colorName }
                </div>
                <ClipboardButton
                    text={ `#${this.store.tinyColor.toHex()}` }
                    namespace="hex"
                />
            </div>
        )
    }

    renderContent() {
        return (
            <div class="content" />
        )
    }

    renderBottombar() {
        return (
            <div class="bottom-bar">
                <div
                    class="panel-controller"
                    onClick={ () => this.togglePanel() }
                >
                    <i
                        class="fa"
                        class-fa-chevron-down={ !this.panelOpen }
                        class-fa-chevron-up={ this.panelOpen }
                        aria-hidden="true"
                    />
                </div>
                <ClipboardButton
                    text={ this.store.tinyColor.toRgbString() }
                    namespace="rgb"
                />
            </div>
        )
    }
}
