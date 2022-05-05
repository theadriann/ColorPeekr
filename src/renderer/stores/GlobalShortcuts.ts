//
import { forEach, each } from "lodash";
import { ColorPeekrStore } from "./ColorPeekrStore";

// utils
const remote = require("@electron/remote");
const { globalShortcut } = remote;

export default class GlobalShortcuts {
    //

    Shortcuts = [
        { command: "CommandOrControl+Alt+1", action: "toggleLock" },
        { command: "CommandOrControl+Alt+2", action: "saveColor" },
    ];

    store: ColorPeekrStore;

    constructor(store: any) {
        this.store = store;

        this.registerShortcuts();

        window.addEventListener("unload", () => this.dispose());
    }

    get window() {
        return remote.getCurrentWindow();
    }

    action = (actionName: string) => {
        switch (actionName) {
            case "toggleLock":
                this.store.picker.toggleLocked();
                break;

            case "saveColor":
                this.store.picker.saveColor();
                break;
        }
    };

    handleShortcut = (shortcut: any, register = false) => {
        if (register) {
            globalShortcut.register(shortcut.command, () => {
                this.action(shortcut.action);
            });
        } else {
            globalShortcut.unregister(shortcut.command);
        }
    };

    registerShortcuts = () => {
        forEach(this.Shortcuts, (shortcut: any) => {
            this.handleShortcut(shortcut, true);
        });
    };

    unregisterShortcuts = () => {
        each(this.Shortcuts, (shortcut: any) => {
            this.handleShortcut(shortcut, false);
        });
    };

    dispose() {
        this.unregisterShortcuts();
    }
}
