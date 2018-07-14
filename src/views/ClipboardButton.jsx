// React Deps
import React from 'react'
import { Attribute, Component, Observer, Observable } from 'app/decorators'

// Utils
import classNames from 'classnames'

// Styles
import ClipboardButtonLess from './ClipboardButton.less'

@Observer
@Component
export default class ClipboardButton extends React.Component {
    @Observable hovered = false
    @Observable hoverMessage = 'click here to copy'

    @Attribute text = ''
    @Attribute namespace = ''

    // ------------------------
    // Event Handling Methods
    // ------------------------

    onMouseLeave = () => {
        this.hovered = false
    }

    onMouseEnter = () => {
        this.hovered = true
    }

    onCopyClick = () => {
        this.scope.clipboard.writeText(this.text)

        // Show copied message
        this.hoverMessage = 'copied to clipboard!'

        // Make sure there's no existing timeout
        clearTimeout(this.timeout)

        // Set timeout to reset message
        this.timeout = setTimeout(() => (this.hoverMessage = 'click here to copy'), 1300)
    }

    // ------------------------
    // Rendering Methods
    // ------------------------

    render() {
        const containerClasses = classNames(this.namespace, ClipboardButtonLess.container)

        return (
            <div
                className={containerClasses}
                onClick={this.onCopyClick}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
                {...this.undeclaredAttributes()}
            >
                {this.renderText()}
            </div>
        )
    }

    renderText() {
        return this.hovered ? this.hoverMessage : this.text
    }
}
