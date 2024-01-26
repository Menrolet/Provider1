import BasicComponent from "../_basicComponent/basicComponent.js";
import { EmploeeInfo } from "../../common/types.js";
import RequestListElementEmptyView from "./requestListElementEmptyView.js";

/**
 * ViewModel-компонент соответсвующего View
 * @class EmploeeListEmptyElement
 */
export default class EmploeeListEmptyElement extends BasicComponent {
    view: RequestListElementEmptyView;

    constructor(emploee: EmploeeInfo) {
        super();
        this.view = new RequestListElementEmptyView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        this.subscribe();
        return this.root;
    }

    subscribe(): void {
    }
};
