// React Deps
import React from 'react'
import { Component } from 'app/decorators'

// Utils
const robotjs = __non_webpack_require__('robotjs')
const { remote } = __non_webpack_require__('electron')

// Controllers
import Store from 'app/stores/Store'
import GlobalShortcuts from 'app/stores/GlobalShortcuts'

// Styles
import MainViewLess from './MainView.less'

// Views
import SwatchView from './SwatchView'

@Component
export default class MainView extends React.Component {
    constructor(...args) {
        super(...args)

        // Attach utils to scope
        this.scope.store = new Store(this.scope)
        this.scope.shortcuts = new GlobalShortcuts(this.scope)
        this.scope.clipboard = remote.clipboard
    }

    componentDidMount() {
        this.checker = setInterval(() => {
            if (this.store.locked) {
                return
            }

            const mousePos = robotjs.getMousePos()
            const color = robotjs.getPixelColor(mousePos.x, mousePos.y)

            this.store.setColor(`#${color}`)
        }, 10)
    }

    componentWillUnmount() {
        clearInterval(this.checker)
    }

    // ------------------------
    // Shorthands
    // ------------------------

    get store() {
        return this.scope.store
    }

    // ------------------------
    // Rendering Methods
    // ------------------------

    render() {
        return (
            <div className={MainViewLess.container}>
                <SwatchView className={MainViewLess.swatch} />
            </div>
        )
    }
}
