// styles
import './Global.less'

// utils
const { ipcRenderer } = require('electron')

// views
import SwatchView from 'renderer/views/SwatchView'

// register global store
import 'renderer/stores/ColorPeekrStore'

@Component
class ColorPeekrApp extends React.Component {
    //

    // =======================
    // lifecycle methods
    // =======================

    componentDidMount() {
        //
        ipcRenderer.on('get-mouse-pixel', this.onGetMousePixel)

        //
        this.checker = setInterval(() => {
            if (store.picker.locked) {
                return
            }

            ipcRenderer.send('get-mouse-pixel')
        }, 20)
    }

    componentWillUnmount() {
        clearInterval(this.checker)
    }

    // =======================
    // event handling methods
    // =======================

    onGetMousePixel = (event, color) => store.picker.setColor(`#${color}`)

    // =======================
    // rendering methods
    // =======================

    render() {
        return <SwatchView />
    }
}

ReactDOM.render(<ColorPeekrApp />, document.body)
