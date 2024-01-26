import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
import RequestCardView, { RequestCardInfo } from "./requestCardView.js";
import { Queries } from "../../modules/queries.js";
import { Events } from "../../modules/events.js";

export type RequestCardEventBus = {
    closeEvent: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class RequestCard
 */
export default class RequestCard extends BasicComponent {
    view: RequestCardView;
    data: RequestCardInfo;

    constructor(info: RequestCardInfo) {
        super();
        this.view = new RequestCardView();
        this.data = info;
    }

    render(): HTMLElement {
        this.root = this.view.render(this.data);
        return this.root;
    }

    subscribe(eventBus: RequestCardEventBus): void {
        let subscription: Subscription;

        const assignerInput = (this.root.querySelector('#emploee_form')! as HTMLSelectElement);
        const eqTypeInput = (this.root.querySelector('#equipment_form')! as HTMLSelectElement);
        const addressInput = (this.root.querySelector('#address_input')! as HTMLInputElement);
        
        const closeButton = this.root.querySelector('#request_card__cross')!;
        subscription = {
            element: closeButton,
            event: 'click',
            listener: eventBus.closeEvent,
        }
        this._subscribeEvent(subscription);
        
        const submitButton = this.root.querySelector('#request_card__submit_button')!;
        let submitEvent: Listener;
        if (this.data.info === undefined) {
            submitEvent = () => {
                const assigner = assignerInput.options[assignerInput.selectedIndex].getAttribute("data-em-id")!;
                const reqType = eqTypeInput.options[eqTypeInput.selectedIndex].getAttribute("data-eq-id")!;
                const reqTypeWeight = eqTypeInput.options[eqTypeInput.selectedIndex].getAttribute("data-eq-weight")!;
                const address = addressInput.value;

                let invalid = false;
                if (address === "") {
                    Events.makeInvalid(addressInput, "Введите адрес");
                    invalid = true;
                } else {
                    Events.makeValid(addressInput);
                }
                if (invalid) {
                    return;
                }

                Queries.addRequest({
                    ID: 0,
                    Assigner: {
                        ID: assigner,
                        Name: "",
                        Surname: "",
                        Fathername: ""
                    },
                    reqType: {
                        ID: parseInt(reqType),
                        Name: "",
                        Weight: parseInt(reqTypeWeight),
                    },
                    address: address,
                }).then(() => {
                    Events.openAlertMessage("Запрос успешно добавлен", "ОК", () => {
                        eventBus.closeEvent();
                        window.location.reload();
                    });
                }).catch((err) => {
                    console.log(err);
                    if (err === 403){
                        Events.openAlertMessage("Превышена сложность заявок для сотрудника", "ОК", Events.closeAlertMessage);
                    }else{
                        Events.openAlertMessage("Не удалось добавить запрос", "ОК", Events.closeAlertMessage);
                    }
                })
            };
        }else{
            submitEvent = () => {
                const assigner = assignerInput.options[assignerInput.selectedIndex].getAttribute("data-em-id")!;
                const reqType = eqTypeInput.options[eqTypeInput.selectedIndex].getAttribute("data-eq-id")!;
                const reqTypeWeight = eqTypeInput.options[eqTypeInput.selectedIndex].getAttribute("data-eq-weight")!;
                const address = addressInput.value;

                let invalid = false;
                if (address === "") {
                    Events.makeInvalid(addressInput, "Введите адрес");
                    invalid = true;
                } else {
                    Events.makeValid(addressInput);
                }
                if (invalid) {
                    return;
                }

                Queries.updateRequest({
                    ID: this.data.info!.ID,
                    Assigner: {
                        ID: assigner,
                        Name: "",
                        Surname: "",
                        Fathername: ""
                    },
                    reqType: {
                        ID: parseInt(reqType),
                        Name: "",
                        Weight: parseInt(reqTypeWeight),
                    },
                    address: address,
                }).then(() => {
                    Events.openAlertMessage("Запрос успешно обновлён", "ОК", () => {
                        eventBus.closeEvent();
                        window.location.reload();
                    });
                }).catch((err) => {
                    if (err === 403){
                        Events.openAlertMessage("Превышена сложность заявок для сотрудника", "ОК", Events.closeAlertMessage);
                    }else{
                        Events.openAlertMessage("Не удалось обновить запрос", "ОК", Events.closeAlertMessage);
                    }
                })
            };
        }

        subscription = {
            element: submitButton,
            event: 'click',
            listener: submitEvent,
        }
        this._subscribeEvent(subscription);
    }
}
