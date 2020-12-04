//

import styles from './ColorTile.less'

@Observer
export default class ColorTile extends React.Component {
    //

    @Attribute color

    get picker() {
        return store.picker
    }

    // -----------------------
    // event handling methods
    // -----------------------

    @Action
    onTileClick = (e) => {
        if (e.altKey) {
            this.picker.removeColor(this.color)
            return
        }

        this.picker.lock()
        this.picker.setColor(this.color)
    }

    // -----------------------
    // rendering methods
    // -----------------------

    render() {
        return (
            <div
                className={styles.container}
                style={{ backgroundColor: this.color }}
                onClick={this.onTileClick}
            />
        )
    }
}
