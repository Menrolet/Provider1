import EmploeeListElementEmptyView from "./emploeeListElementEmptyView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import { EmploeeInfo, Subscription } from "../../common/types.js";
import { Events } from "../../modules/events.js";
import { PageLoaders } from "../../modules/pageLoaders.js";
import { URIChanger } from "../../modules/uriChanger.js";
import { Requests } from "../../modules/requests.js";
import { Queries } from "../../modules/queries.js";

export type EmploeeListElementEventBus = {
    editEmploee: () => void;
    deleteEmploee: () => void;
    emploeesRequests: () => void;
}

/**
 * ViewModel-компонент соответсвующего View
 * @class EmploeeListEmptyElement
 */
export default class EmploeeListEmptyElement extends BasicComponent {
    view: EmploeeListElementEmptyView;

    constructor(emploee: EmploeeInfo) {
        super();
        this.view = new EmploeeListElementEmptyView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        this.subscribe();
        return this.root;
    }

    subscribe(): void {
    }
};
