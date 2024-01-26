import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
import ConfirmMessageView, {ConfirmMessageData} from "./confirmMessageView.js";
import {read} from "fs";

export type ConfirmMessageEventBus = {
    okEvent: Listener,
    cancelEvent: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class ConfirmMessage
 */
export default class ConfirmMessage extends BasicComponent {
    view: ConfirmMessageView;

    constructor() {
        super();
        this.view = new ConfirmMessageView();
    }

    render(data: ConfirmMessageData): HTMLElement {
        this.root = this.view.render(data);
        return this.root;
    }

    subscribe(eventBus: ConfirmMessageEventBus): void {
        let subscription: Subscription;

        const okButton = this.root.querySelector('.accent_button')!;
        subscription = {
            element: okButton,
            event: 'click',
            listener: eventBus.okEvent,
        }
        this._subscribeEvent(subscription);

        const cancelButton = this.root.querySelector('.negative_non_accent_button')!;
        subscription = {
            element: cancelButton,
            event: 'click',
            listener: eventBus.cancelEvent,
        }
        this._subscribeEvent(subscription);
    }
}
