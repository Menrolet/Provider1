import NewRequestButtonView from "./newRequestButtonView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
export type NewRequestButtonEvent = () => void;

/**
 * ViewModel-компонент соответсвующего View
 * @class NewRequestButton
 */
export default class NewRequestButton extends BasicComponent {
    view: NewRequestButtonView;

    constructor() {
        super();
        this.view = new NewRequestButtonView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    subscribe(event: Listener): void {
        let subscription: Subscription;
        const button: HTMLElement = this.root;
        subscription = {
            element: button,
            event: 'click',
            listener: () => {
                event();
            },
        }
        this._subscribeEvent(subscription);
    }
};
