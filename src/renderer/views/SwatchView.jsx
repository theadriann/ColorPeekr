// components
import ClipboardButton from './ClipboardButton'

// styles
import styles from './SwatchView.less'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import ColorTile from './ColorTile'

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
        const icon = this.picker.locked ? faLock : faUnlock

        return (
            <div className="top-bar">
                <div className="title">
                    <FontAwesomeIcon
                        icon={icon}
                        className={styles.icon}
                        onClick={this.onLockClick}
                    />
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

        return (
            <div className="content">
                {this.picker.allSavedColors.map((color) => (
                    <ColorTile key={color} color={color} />
                ))}
            </div>
        )
    }

    renderBottomBar() {
        const icon = this.picker.panelOpen ? faChevronUp : faChevronDown

        return (
            <div className="bottom-bar">
                <div className="panel-controller" onClick={this.onPanelToggleClick}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <ClipboardButton text={this.color.toRgbString()} namespace="rgb" />
            </div>
        )
    }
}
