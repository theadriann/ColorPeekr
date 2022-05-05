// components
import ColorTile from "./ColorTile";
import ClipboardButton from "./ClipboardButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// icons
import {
    faChevronUp,
    faChevronDown,
    faLock,
    faUnlock,
} from "@fortawesome/free-solid-svg-icons";

// state
import { store } from "../stores/ColorPeekrStore";

// utils
import { observer } from "mobx-react";

// styles
import s from "./SwatchView.module.scss";

const SwatchView = observer(() => {
    //
    const picker = store.picker;
    const color = picker.tinyColor;

    // -----------------------
    // events handling methods
    // -----------------------

    const onLockClick = () => store.picker.toggleLocked();

    const onPanelToggleClick = () => store.picker.togglePanelOpen();

    // -----------------------
    // rendering methods
    // -----------------------

    const renderTopBar = () => {
        const icon = picker.locked ? faLock : faUnlock;

        return (
            <div className={s["top-bar"]}>
                <div className={s["title"]}>
                    <FontAwesomeIcon
                        icon={icon}
                        className={s.icon}
                        onClick={onLockClick}
                    />
                    {picker.colorName}
                </div>
                <ClipboardButton text={`#${color.toHex()}`} namespace="hex" />
            </div>
        );
    };

    const renderContent = () => {
        if (!picker.panelOpen) {
            return null;
        }

        return (
            <div className={s["content"]}>
                {picker.allSavedColors.map((color: any) => (
                    <ColorTile key={color} color={color} />
                ))}
            </div>
        );
    };

    const renderBottomBar = () => {
        const icon = picker.panelOpen ? faChevronUp : faChevronDown;

        return (
            <div className={s["bottom-bar"]}>
                <div
                    className={s["panel-controller"]}
                    onClick={onPanelToggleClick}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>
                <ClipboardButton text={color.toRgbString()} namespace="rgb" />
            </div>
        );
    };

    return (
        <div
            style={{
                color: picker.textColor,
                backgroundColor: picker.tinyColor.toHexString(),
            }}
            className={s.container}
        >
            {renderTopBar()}
            {renderContent()}
            {renderBottomBar()}
        </div>
    );
});

export default SwatchView;
