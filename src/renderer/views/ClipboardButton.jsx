// styles
import styles from './ClipboardButton.less'

@Observer
@Component
export default class ClipboardButton extends React.Component {
    //

    @Attribute text = ''
    @Attribute namespace = ''

    @Observable hovered = false
    @Observable hoverMessage = 'click here to copy'

    // ------------------------
    // event handling methods
    // ------------------------

    @Action
    onMouseLeave = () => {
        this.hovered = false
    }

    @Action
    onMouseEnter = () => {
        this.hovered = true
    }

    @Action
    onCopyClick = () => {
        store.clipboard.writeText(this.text)

        // Show copied message
        this.hoverMessage = 'copied to clipboard!'

        // Make sure there's no existing timeout
        clearTimeout(this.timeout)

        // Set timeout to reset message
        this.timeout = setTimeout(() => (this.hoverMessage = 'click here to copy'), 1300)
    }

    // ------------------------
    // rendering methods
    // ------------------------

    render() {
        const containerClasses = classnames(this.namespace, styles.container)

        return (
            <div
                className={containerClasses}
                onClick={this.onCopyClick}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
                {...this.childAttributes()}
            >
                {this.renderText()}
            </div>
        )
    }

    renderText() {
        return this.hovered ? this.hoverMessage : this.text
    }
}
