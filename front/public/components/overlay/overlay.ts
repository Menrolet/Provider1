import BasicComponent from "../_basicComponent/basicComponent.js";
import OverlayView from "./overlayView.js";

export type OverlayEventBus = {
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Overlay
 */
export default class Overlay extends BasicComponent {
    view: OverlayView;

    constructor() {
        super();
        this.view = new OverlayView();
    }

    render(): HTMLElement {
        super.render();
        this.root = this.view.render();
        return this.root;
    }

    subscribe(eventBus: OverlayEventBus) {
    }
}
