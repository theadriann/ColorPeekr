// React Deps
import React from 'react'
import { Attribute, Component, Computed, Observer } from 'app/decorators'

// Utils
import classNames from 'classnames'

// Styles
import SwatchViewLess from './SwatchView.less'

// Views
import ClipboardButton from './ClipboardButton'

@Observer
@Component({ events: ['onLockChange', 'onPanelChange'] })
export default class SwatchView extends React.Component {
    @Attribute textColor
    @Attribute colorName

    // ------------------------
    // Shorthands
    // ------------------------

    @Computed
    get store() {
        return this.scope.store
    }

    // ------------------------
    // Computed States
    // ------------------------

    @Computed
    get panelOpen() {
        return this.store.panelOpen
    }

    @Computed
    get locked() {
        return this.store.locked
    }

    // ------------------------
    // Computed Data
    // ------------------------

    @Computed
    get backgroundColor() {
        return this.store.tinyColor
    }

    // ------------------------
    // Event Handling Methods
    // ------------------------

    onLockClick = () => {
        this.store.locked = !this.locked
    }

    onPanelToggleClick = () => {
        this.store.panelOpen = !this.panelOpen
    }

    // ------------------------
    // Rendering Utils
    // ------------------------

    @Computed
    get containerStyle() {
        return {
            color: this.store.textColor,
            backgroundColor: this.backgroundColor
        }
    }

    // ------------------------
    // Rendering Methods
    // ------------------------

    render() {
        return (
            <div
                style={this.containerStyle}
                className={SwatchViewLess.container}
                {...this.undeclaredAttributes()}
            >
                {this.renderTopbar()}
                {this.renderContent()}
                {this.renderBottombar()}
            </div>
        )
    }

    renderTopbar() {
        const iconClasses = classNames('fa', {
            'fa-lock': this.locked,
            'fa-unlock': !this.locked
        })

        return (
            <div className="top-bar">
                <div className="title">
                    <i aria-hidden="true" className={iconClasses} onClick={this.onLockClick} />
                    {this.store.colorName}
                </div>
                <ClipboardButton text={`#${this.backgroundColor.toHex()}`} namespace="hex" />
            </div>
        )
    }

    renderContent() {
        if (!this.panelOpen) {
            return null
        }

        return <div className="content" />
    }

    renderBottombar() {
        const iconClasses = classNames('fa', {
            'fa-chevron-down': !this.panelOpen,
            'fa-chevron-up': this.panelOpen
        })

        return (
            <div className="bottom-bar">
                <div className="panel-controller" onClick={this.onPanelToggleClick}>
                    <i className={iconClasses} aria-hidden="true" />
                </div>
                <ClipboardButton text={this.backgroundColor.toRgbString()} namespace="rgb" />
            </div>
        )
    }
}
