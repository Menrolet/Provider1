import BasicComponent from "../_basicComponent/basicComponent.js";
import { Listener, Subscription } from "../../common/types";
import EmploeeCardView, { EmploeeCardInfo } from "./emploeeCardView.js";
import { Queries } from "../../modules/queries.js";
import { Events } from "../../modules/events.js";

export type EmploeeCardEventBus = {
    closeEvent: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class EmploeeCard
 */
export default class EmploeeCard extends BasicComponent {
    view: EmploeeCardView;
    data: EmploeeCardInfo;

    constructor(info: EmploeeCardInfo) {
        super();
        this.view = new EmploeeCardView();
        this.data = info;
    }

    render(): HTMLElement {
        this.root = this.view.render(this.data);
        return this.root;
    }

    subscribe(eventBus: EmploeeCardEventBus): void {
        let subscription: Subscription;

        const nameInput = (this.root.querySelector('#emploee_card__name_input')! as HTMLInputElement);
        const surnameInput = (this.root.querySelector('#emploee_card__surname_input')! as HTMLInputElement);
        const fathernameInput = (this.root.querySelector('#emploee_card__fathername_input')! as HTMLInputElement);

        const closeButton = this.root.querySelector('#emploee_card__cross')!;
        subscription = {
            element: closeButton,
            event: 'click',
            listener: eventBus.closeEvent,
        }
        this._subscribeEvent(subscription);

        const submitButton = this.root.querySelector('#emploee_card__submit_button')!;
        let submitEvent: Listener;
        if (this.data.info === undefined) {
            submitEvent = () => {
                const name = nameInput.value;
                const surname = surnameInput.value;
                const fathername = fathernameInput.value;

                let invalid = false;
                if (name === "") {
                    Events.makeInvalid(nameInput, "Введите имя");
                    invalid = true;
                } else {
                    Events.makeValid(nameInput);
                }
                if (surname === "") {
                    Events.makeInvalid(surnameInput, "Введите фамилию");
                    invalid = true;
                } else {
                    Events.makeValid(surnameInput);
                }
                if (fathername === "") {
                    Events.makeInvalid(fathernameInput, "Введите отчество");
                    invalid = true;
                } else {
                    Events.makeValid(fathernameInput);
                }
                if (invalid) {
                    return;
                }

                Queries.addEmploee({
                    ID: "",
                    Name: name,
                    Surname: surname,
                    Fathername: fathername,
                }).then(() => {
                    Events.openAlertMessage("Сотрудник успешно добавлен", "ОК", () => {
                        eventBus.closeEvent();
                        window.location.reload();
                    });
                }).catch(() => {
                    Events.openAlertMessage("Не удалось добавить сотрудника", "ОК", Events.closeAlertMessage);
                })
            };
        } else {
            submitEvent = () => {
                const name = nameInput.value;
                const surname = surnameInput.value;
                const fathername = fathernameInput.value;

                let invalid = false;
                if (name === "") {
                    Events.makeInvalid(nameInput, "Введите имя");
                    invalid = true;
                } else {
                    Events.makeValid(nameInput);
                }
                if (surname === "") {
                    Events.makeInvalid(surnameInput, "Введите фамилию");
                    invalid = true;
                } else {
                    Events.makeValid(surnameInput);
                }
                if (fathername === "") {
                    Events.makeInvalid(fathernameInput, "Введите отчество");
                    invalid = true;
                } else {
                    Events.makeValid(fathernameInput);
                }
                if (invalid) {
                    return;
                }

                Queries.updateEmploee({
                    ID: this.data.info!.ID,
                    Name: name,
                    Surname: surname,
                    Fathername: fathername,
                }).then(() => {
                    Events.openAlertMessage("Сотрудник успешно обновлён", "ОК", () => {
                        eventBus.closeEvent();
                        window.location.reload();
                    });
                }).catch(() => {
                    Events.openAlertMessage("Не удалось обновить сотрудника", "ОК", Events.closeAlertMessage);
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
