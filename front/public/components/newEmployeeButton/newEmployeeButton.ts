import NewEmployeeButtonView from "./newEmployeeButtonView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";

/**
 * ViewModel-компонент соответсвующего View
 * @class NewEmployeeButton
 */
export default class NewEmployeeButton extends BasicComponent {
    view: NewEmployeeButtonView;

    constructor() {
        super();
        this.view = new NewEmployeeButtonView();
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
