// state
import { store } from "../stores/ColorPeekrStore";

// utils
import cn from "classnames";
import { observer } from "mobx-react";
import { useRef, useState } from "react";

// styles
import styles from "./ClipboardButton.module.scss";

const ClipboardButton = observer(({ text, namespace, ...otherProps }: any) => {
    //
    const [hovered, setHovered] = useState(false);
    const [hoverMessage, setHoverMessage] = useState("click here to copy");
    const timeoutRef = useRef(null);

    // ------------------------
    // event handling methods
    // ------------------------

    const onMouseLeave = () => {
        setHovered(false);
    };

    const onMouseEnter = () => {
        setHovered(true);
    };

    const onCopyClick = () => {
        store.clipboard.writeText(text);

        // Show copied message
        setHoverMessage("copied to clipboard!");

        // Make sure there's no existing timeout
        clearTimeout(timeoutRef.current);

        // Set timeout to reset message
        timeoutRef.current = setTimeout(
            () => setHoverMessage("click here to copy"),
            1300
        );
    };

    // ------------------------
    // rendering methods
    // ------------------------

    const containerClasses = cn(namespace, styles.container);

    return (
        <div
            className={containerClasses}
            onClick={onCopyClick}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            {...otherProps}
        >
            {hovered ? hoverMessage : text}
        </div>
    );
});

export default ClipboardButton;
