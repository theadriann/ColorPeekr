// utils
const remote = require("@electron/remote");

// stores
import PickerStore from "./PickerStore";
import GlobalShortcuts from "./GlobalShortcuts";

export class ColorPeekrStore {
    //

    picker: PickerStore;
    shortcuts: GlobalShortcuts;
    clipboard: any;

    constructor() {
        this.picker = new PickerStore(this);
        this.shortcuts = new GlobalShortcuts(this);
        this.clipboard = remote.clipboard;
    }
}

const store = new ColorPeekrStore();
export { store };
