import EmploeeListElementView from "./emploeeListElementView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import { EmploeeInfo, Subscription } from "../../common/types.js";
import { Events } from "../../modules/events.js";
import { PageLoaders } from "../../modules/pageLoaders.js";
import { URIChanger } from "../../modules/uriChanger.js";
import { Requests } from "../../modules/requests.js";
import { Queries } from "../../modules/queries.js";
import EmploeeListElementEmptyView from "../emploeeListElementEmpty/emploeeListElementEmptyView.js";

export type EmploeeListElementEventBus = {
    editEmploee: () => void;
    deleteEmploee: () => void;
    emploeesRequests: () => void;
}

/**
 * ViewModel-компонент соответсвующего View
 * @class EmploeeListElement
 */
export default class EmploeeListElement extends BasicComponent {
    view: EmploeeListElementView;
    emploee: EmploeeInfo;

    constructor(emploee: EmploeeInfo) {
        super();
        this.view = new EmploeeListElementView();
        this.emploee = emploee;
    }

    render(): HTMLElement {
        this.root = this.view.render(this.emploee);
        this.subscribe();
        return this.root;
    }

    subscribe(): void {
        let subscription: Subscription;

        const editButton = this.root.querySelectorAll(".emploee_list__element__button")[0];
        const deleteButton = this.root.querySelectorAll(".emploee_list__element__button")[1];
        const requestsButton = this.root.querySelectorAll(".emploee_list__element__button")[2];

        subscription = {
            element: editButton,
            event: 'click',
            listener: () => {
                Events.makeEmploeeCardOverlay({
                    info: this.emploee,
                });
            },
        }
        this._subscribeEvent(subscription);

        subscription = {
            element: deleteButton,
            event: 'click',
            listener: () => {
                Queries.deleteEmploee(this.emploee.ID).catch(() => {
                    Events.openAlertMessage("Не удалось удалить сотрудника", "ОК", Events.closeAlertMessage);
                }).then(() => {
                    this.root.remove();
                    if (document.getElementsByClassName("emploee_list__element").length == 0) {
                        const element = new EmploeeListElementEmptyView();
                        document.querySelector(".emploee_list")!.appendChild(element.render());
                    }
                })
            },
        }
        this._subscribeEvent(subscription);

        subscription = {
            element: requestsButton,
            event: 'click',
            listener: () => {
                URIChanger.requestsPage(this.emploee.ID);
            },
        }
        this._subscribeEvent(subscription);
    }
};
