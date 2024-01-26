
import BasicComponent from "../_basicComponent/basicComponent.js";
import RequestListView from "./requestListView.js";
import RequestListElement from "../requestListElement/requestListElement.js";
import { RequestInfo } from "../../common/types.js";
import RequestListElementEmptyView from "../requestListElementEmpty/requestListElementEmptyView.js";

/**
 * ViewModel-компонент соответсвующего View
 * @class RequestList
 */
export default class RequestList extends BasicComponent {
    view: RequestListView;
    elements: RequestListElement[];

    constructor() {
        super();
        this.view = new RequestListView();
        this.elements = [];
    }

    render(requestList: RequestInfo[]): HTMLElement {
        this.root = this.view.render();

        if (requestList.length === 0) {
            const element = new RequestListElementEmptyView();
            this.root.appendChild(element.render());
            return this.root;
        }

        requestList.forEach((request) => {
            const element = new RequestListElement(request, this.root);
            this.root.appendChild(element.render());
            this.elements.push(element);
        });
        return this.root;
    }

    subscribe(): void {
    }
};
