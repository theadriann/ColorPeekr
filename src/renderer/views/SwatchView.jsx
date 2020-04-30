// components
import ClipboardButton from './ClipboardButton'

// styles
import styles from './SwatchView.less'

@Observer
export default class SwatchView extends React.Component {
    //

    // =======================
    // shorthands
    // =======================

    get picker() {
        return store.picker
    }

    // =======================
    // event handling methods
    // =======================

    onLockClick = () => store.picker.toggleLocked()

    onPanelToggleClick = () => store.picker.togglePanelOpen()

    // =======================
    // computed data
    // =======================

    @Computed
    get color() {
        return this.picker.tinyColor
    }

    // =======================
    // rendering methods
    // =======================

    render() {
        const containerStyle = {
            color: this.picker.textColor,
            backgroundColor: this.color,
        }

        return (
            <div style={containerStyle} className={styles.container}>
                {this.renderTopBar()}
                {this.renderContent()}
                {this.renderBottomBar()}
            </div>
        )
    }

    renderTopBar() {
        const iconClasses = classnames('fa', {
            'fa-lock': this.picker.locked,
            'fa-unlock': !this.picker.locked,
        })

        return (
            <div className="top-bar">
                <div className="title">
                    <i aria-hidden="true" className={iconClasses} onClick={this.onLockClick} />
                    {this.picker.colorName}
                </div>
                <ClipboardButton text={`#${this.color.toHex()}`} namespace="hex" />
            </div>
        )
    }

    renderContent() {
        if (!this.picker.panelOpen) {
            return null
        }

        return <div className="content" />
    }

    renderBottomBar() {
        const iconClasses = classnames('fa', {
            'fa-chevron-down': !this.picker.panelOpen,
            'fa-chevron-up': this.picker.panelOpen,
        })

        return (
            <div className="bottom-bar">
                <div className="panel-controller" onClick={this.onPanelToggleClick}>
                    <i className={iconClasses} aria-hidden="true" />
                </div>
                <ClipboardButton text={this.color.toRgbString()} namespace="rgb" />
            </div>
        )
    }
}
