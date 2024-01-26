import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
import AlertMessageView, {AlertMessageData} from "./alertMessageView.js";

export type AlertMessageEventBus = {
    okEvent: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class AlertMessage
 */
export default class AlertMessage extends BasicComponent {
    view: AlertMessageView;

    constructor() {
        super();
        this.view = new AlertMessageView();
    }

    render(data: AlertMessageData): HTMLElement {
        this.root = this.view.render(data);
        return this.root;
    }

    subscribe(eventBus: AlertMessageEventBus): void {
        let subscription: Subscription;

        const okButton = this.root.querySelector('.accent_button')!;
        subscription = {
            element: okButton,
            event: 'click',
            listener: eventBus.okEvent,
        }
        this._subscribeEvent(subscription);
    }
}
