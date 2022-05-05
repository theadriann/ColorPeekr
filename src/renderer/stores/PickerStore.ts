// electron
const remote = require("@electron/remote");
const appWindow = remote.BrowserWindow.getAllWindows()[0];

// state
import { ColorPeekrStore } from "./ColorPeekrStore";

// utils
import namer from "color-namer";
import tinyjs from "third_party/tiny";
import { makeAutoObservable, reaction } from "mobx";
import { flatten, map, orderBy, startCase } from "lodash";

export default class PickerStore {
    //

    locked = false;
    panelOpen = false;
    activeColor = "#333";

    savedColors = new Set();

    store: ColorPeekrStore;

    constructor(store: ColorPeekrStore) {
        this.store = store;

        this.fetchDB();

        makeAutoObservable(this);

        reaction(() => this.panelOpen, this.onPanelOpenChange);
    }

    get allSavedColors() {
        return [...this.savedColors.values()];
    }

    // ------------------------
    // core methods
    // ------------------------

    _setColor = (color: any) => (this.activeColor = color);

    setColor = (color: any) =>
        requestAnimationFrame(() => this._setColor(color));

    setSize(size: any) {
        appWindow.setSize(250, Number(size), false);
    }

    saveColor = () => {
        this.savedColors.add(this.activeColor);
        this.updateDB();
    };

    removeColor = (color: any) => {
        this.savedColors.delete(color);
        this.updateDB();
    };

    fetchDB() {
        this.savedColors.clear();

        try {
            const savedColors = JSON.parse(localStorage.getItem("savedColors"));

            for (let color of savedColors) {
                this.savedColors.add(color);
            }
        } catch (e) {
            console.warn(`couldn't find any saved colors`);
        }
    }

    updateDB() {
        try {
            window.localStorage.setItem(
                "savedColors",
                JSON.stringify(this.allSavedColors)
            );
        } catch (e) {
            console.warn(`couldn't persist-save colors`);
        }
    }

    lock = () => (this.locked = true);

    toggleLocked = () => (this.locked = !this.locked);

    togglePanelOpen = () => (this.panelOpen = !this.panelOpen);

    // ------------------------
    // event handling methods
    // ------------------------

    onPanelOpenChange = (open: boolean) => {
        this.setSize(open ? 200 : 80);
    };

    // ------------------------
    // computed data
    // ------------------------

    get tinyColor() {
        return tinyjs(this.activeColor);
    }

    get colorName() {
        const names = flatten(map(namer(this.tinyColor.getOriginalInput())));
        const ordered = orderBy(names, (name: any) =>
            parseFloat(name.distance)
        );

        return startCase(ordered[0].name);
    }

    get textColor() {
        const luminance = this.tinyColor.getLuminance();

        if (luminance <= 0.5) {
            return "#fff";
        }

        return "#000";
    }
}
