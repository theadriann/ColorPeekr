// store
import { store } from "../stores/ColorPeekrStore";

// utils
import { observer } from "mobx-react";

// styles
import styles from "./ColorTile.module.scss";

const ColorTile = observer(({ color }: any) => {
    //
    const picker = store.picker;

    //
    const onTileClick = (e: any) => {
        if (e.altKey) {
            picker.removeColor(color);
            return;
        }

        picker.lock();
        picker.setColor(color);
    };

    // -----------------------
    // rendering methods
    // -----------------------

    return (
        <div
            className={styles.container}
            style={{ backgroundColor: color }}
            onClick={onTileClick}
        />
    );
});

export default ColorTile;
