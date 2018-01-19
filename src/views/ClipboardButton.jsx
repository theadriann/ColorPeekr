
// Styles
import ClipboardButtonLess from './ClipboardButton.less'

@Component
export default class ClipboardButton {

    @Observable hoverMessage = 'click here to copy'

    @Attribute text = ''
    @Attribute namespace = ''

    get isHovered() {
        return this.scope.hovered === this.namespace
    }

    copyToClipboard() {
        this.scope.clipboard.writeText(this.text)
        this.hoverMessage = 'copied!'

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.hoverMessage = 'click here to copy', 1000)
    }

    onMouseLeave() {
        this.scope.hovered = false
    }

    onMouseEnter() {
        this.scope.hovered = this.namespace
    }

    render() {
        return (
            <div
                class={ this.namespace }
                class={ ClipboardButtonLess.container }
                onClick={ () => this.copyToClipboard() }
                onMouseLeave={ () => this.onMouseLeave() }
                onMouseEnter={ () => this.onMouseEnter() }
                { ...this.undeclaredAttributes()
                }
            >
                <if condition={ this.isHovered }>
                    { this.hoverMessage }
                </if>
                <else>
                    { this.text }
                </else>
            </div>
        )
    }
}
