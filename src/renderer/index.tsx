// components
import SwatchView from "renderer/components/SwatchView";

// state
import { store } from "./stores/ColorPeekrStore";

// utils
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
const { ipcRenderer } = require("electron");

// styles
import "./Global.scss";

const ColorPeekrApp = () => {
    //
    const checkerRef = useRef(null);

    //
    const onGetMousePixel = (event: any, color: any) =>
        store.picker.setColor(`#${color}`);

    useEffect(() => {
        //
        ipcRenderer.on("get-mouse-pixel", onGetMousePixel);

        //
        checkerRef.current = setInterval(() => {
            if (store.picker.locked) {
                return;
            }

            ipcRenderer.send("get-mouse-pixel");
        }, 20);

        return () => {
            //
            ipcRenderer.removeListener("get-mouse-pixel", onGetMousePixel);

            //
            clearInterval(checkerRef.current);
        };
    }, []);

    return <SwatchView />;
};

ReactDOM.render(<ColorPeekrApp />, document.body);
