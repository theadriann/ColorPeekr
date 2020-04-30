// utils
const { remote } = __non_webpack_require__('electron')

// stores
import PickerStore from './PickerStore'
import GlobalShortcuts from './GlobalShortcuts'

export class ColorPeekrStore {
    //

    constructor() {
        this.picker = new PickerStore(this)
        this.shortcuts = new GlobalShortcuts(this)
        this.clipboard = remote.clipboard
    }
}

global.store = new ColorPeekrStore()
