import Overlay, {OverlayEventBus} from "../components/overlay/overlay.js";
import {
    Listener,
} from "../common/types";
import BasicComponent from "../components/_basicComponent/basicComponent.js";
import {AlertMessageData} from "../components/alertMessage/alertMessageView.js";
import AlertMessage, {AlertMessageEventBus} from "../components/alertMessage/alertMessage.js";
import {ConfirmMessageData} from "../components/confirmMessage/confirmMessageView.js";
import ConfirmMessage, {ConfirmMessageEventBus} from "../components/confirmMessage/confirmMessage.js";
import EmploeeCard, { EmploeeCardEventBus } from "../components/emploeeCard/emploeeCard.js";
import { EmploeeCardInfo } from "../components/emploeeCard/emploeeCardView.js";
import { RequestCardInfo } from "../components/requestCard/requestCardView.js";
import RequestCard, { RequestCardEventBus } from "../components/requestCard/requestCard.js";


export class Events {
    static #emploeeCardEventBus: EmploeeCardEventBus = {
        closeEvent: Events.#closeOverlay,
    }

    static #requestCardEventBus: RequestCardEventBus = {
        closeEvent: Events.#closeOverlay,
    }

    /**
     * Отрисовывает оверлей
     */
    static async openOverlay(): Promise<void> {
        const eventBus: OverlayEventBus = {}

        const overlay = new Overlay();
        await overlay.render();

        const root = document.getElementById('root')!;
        root.appendChild(overlay.root);
        await overlay.subscribe(eventBus);
    }

    /**
     * Удаляет оверлей
     */
    static #closeOverlay(): void {
        const overlay = document.getElementById('overlay');
        if (overlay !== null) {
            overlay.parentNode!.removeChild(overlay);
        }
    }

    /**
     * Перерисовывает плашку оверлея на view
     * @param {BasicComponent} controller
     * @param {Object?} eventBus
     */
    static async #changeOverlay(controller: BasicComponent, eventBus?: object): Promise<void> {
        const overlayCenter = document.getElementById('overlay__center')!;
        overlayCenter.innerHTML = '';
        await controller.render();
        overlayCenter.appendChild(controller.root);
        controller.subscribe(eventBus);
    }

    /**
     * Создаёт оверлей с формой карточки сотрудника
     */
    static async makeEmploeeCardOverlay(data: EmploeeCardInfo): Promise<void> {
        await Events.openOverlay();
        await Events.#changeOverlay(new EmploeeCard(data), Events.#emploeeCardEventBus);
    }

    /**
     * Создаёт оверлей с формой карточки запроса
     */
    static async makeRequestCardOverlay(data: RequestCardInfo): Promise<void> {
        await Events.openOverlay();
        await Events.#changeOverlay(new RequestCard(data), Events.#requestCardEventBus);
    }

    /**
     * Выводит сообщение message под элементом element
     * @param {HTMLElement} element
     * @param {string} message
     */
    static makeInvalid(element: HTMLElement, message: string): void {
        Events.makeValid(element);
        const errorClass = "error-message"
        const siblings = element.parentNode!.childNodes;

        const wrongSign = document.createElement('div');
        wrongSign.innerHTML = `<div class=\"${errorClass}\">${message}</div>`;

        if (typeof (element as HTMLFormElement).setCustomValidity !== 'undefined') {
            (element as HTMLFormElement).setCustomValidity(message);
        }

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    element.after(wrongSign);
                    break;
                }
                if (!((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class=\"${errorClass}\">`))) {
                    element.after(wrongSign);
                }
                break;
            }
        }
    }

    /**
     * Убирает невалидность формы element
     * @param {HTMLElement} element
     */
    static makeValid(element: HTMLElement): void {
        if (typeof (element as HTMLFormElement).setCustomValidity !== 'undefined') {
            (element as HTMLFormElement).setCustomValidity('');
        }
        const errorClass = "error-message";
        const siblings = element.parentNode!.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    break;
                }
                if ((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class=\"${errorClass}\">`)) {
                    element.parentNode!.removeChild(siblings[i + 1]);
                }
                break;
            }
        }
    }

    /**
     * Отматывает наверх страницы
     */
    static scrollUp() {
        const comments = document.querySelector('.commentary__block__wrapper')!;
        window.scroll({
            top: 0,
        });
    }

    /**
     * Открывает alert сообщение
     */
    static openAlertMessage(message: string, buttonValue?: string, alertListener?: Listener) {
        const body = document.querySelector("body")!;

        const data: AlertMessageData = {
            message: message,
            buttonValue: buttonValue,
        }

        if (alertListener === undefined) alertListener = () => {
        };
        const eventBus: AlertMessageEventBus = {
            okEvent: () => {
                Events.closeAlertMessage();
                alertListener!();
            },
        }

        const alertMessage = new AlertMessage();
        alertMessage.render(data);
        alertMessage.subscribe(eventBus);

        body.classList.add("disabled");
        body.appendChild(alertMessage.root);
    }

    /**
     * Закрывает alert сообщение
     */
    static closeAlertMessage() {
        const body = document.querySelector("body")!;
        body.classList.remove("disabled");
        const message = body.querySelector(".alert_prompt")!;
        body.removeChild(message);
    }

    /**
     * Открывает confirm сообщение
     */
    static openConfirmMessage(message: string, okListener: Listener, cancelListener: Listener, values?: {
        positiveValue?: string, negativeValue?: string,
    }) {
        const body = document.querySelector("body")!;

        const data: ConfirmMessageData = {
            message: message,
            values: values,
        }

        const eventBus: ConfirmMessageEventBus = {
            okEvent: () => {
                Events.closeConfirmMessage();
                okListener();
            },
            cancelEvent: () => {
                Events.closeConfirmMessage();
                cancelListener();
            }
        }

        const confirmMessage = new ConfirmMessage();
        confirmMessage.render(data);
        confirmMessage.subscribe(eventBus);

        body.classList.add("disabled");
        body.appendChild(confirmMessage.root);
    }

    /**
     * Закрывает confirm сообщение
     */
    static closeConfirmMessage() {
        const body = document.querySelector("body")!;
        body.classList.remove("disabled");
        const message = body.querySelector(".alert_prompt")!;
        body.removeChild(message);
    }

    static updateWeightSum(change: number, parent?: HTMLElement){
        const sumEl = (parent === undefined ? document.querySelector("#weight_sum")! : parent.querySelector("#weight_sum")!) as HTMLElement;
        const curSum = parseInt(sumEl.innerText.match(/[0-9]+/)![0]);
        sumEl.innerText = `${curSum+change}/300`;
    }
}