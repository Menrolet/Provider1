import BasicComponent from "../_basicComponent/basicComponent.js";
import { RequestInfo, Subscription } from "../../common/types.js";
import RequestListElementView from "./requestListElementView.js";
import { Events } from "../../modules/events.js";
import { Queries } from "../../modules/queries.js";
import RequestListElementEmptyView from "../requestListElementEmpty/requestListElementEmptyView.js";

export type RequestListElementEventBus = {
    editRequest: () => void;
    deleteRequest: () => void;
}

/**
 * ViewModel-компонент соответсвующего View
 * @class RequestListElement
 */
export default class RequestListElement extends BasicComponent {
    view: RequestListElementView;
    request: RequestInfo;
    parent: HTMLElement;

    constructor(request: RequestInfo, parent: HTMLElement) {
        super();
        this.view = new RequestListElementView();
        this.request = request;
        this.parent = parent;
    }

    render(): HTMLElement {
        this.root = this.view.render(this.request);
        this.subscribe();
        Events.updateWeightSum(this.request.reqType.Weight, this.parent);
        return this.root;
    }

    async subscribe(): Promise<void> {
        let subscription: Subscription;

        const emploees = await Queries.getEmploeeList();
        const reqTypes = await Queries.getReqTypesList();
        
        const editButton = this.root.querySelectorAll(".request_list__element__button")[0];
        const deleteButton = this.root.querySelectorAll(".request_list__element__button")[1];

        subscription = {
            element: editButton,
            event: 'click',
            listener: () => {
                Events.makeRequestCardOverlay({
                    info: this.request,
                    emploees: emploees,
                    types: reqTypes,
                });
            },
        }
        this._subscribeEvent(subscription);

        subscription = {
            element: deleteButton,
            event: 'click',
            listener: () => {
                Queries.deleteRequest(this.request.ID).then(() => {
                    this.root.remove();
                    Events.updateWeightSum(-this.request.reqType.Weight);
                    if (document.getElementsByClassName("request_list__element").length == 0) {
                        const element = new RequestListElementEmptyView();
                        document.querySelector(".request_list")!.appendChild(element.render());
                    }
                }).catch(() => {
                    Events.openAlertMessage("Не удалось удалить запрос", "ОК", Events.closeAlertMessage);
                })
            },
        }
        this._subscribeEvent(subscription);
    }
};
