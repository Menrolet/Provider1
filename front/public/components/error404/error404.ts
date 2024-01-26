import BasicComponent from "../_basicComponent/basicComponent.js";
import Error404View from "./error404View.js";

/**
 * ViewModel-компонент соответсвующего View
 * @class Error404
 */
export default class Error404 extends BasicComponent {
    view: Error404View;

    constructor() {
        super();
        this.view = new Error404View();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    subscribe(): void {
    }
}
