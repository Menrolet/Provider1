import "../tmpl/confirmMessage.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

export type ConfirmMessageData = {
    message: string,
    values?: {
        positiveValue?: string,
        negativeValue?: string,
    },
}
/**
 * @class ConfirmMessageView
 */
export default class ConfirmMessageView extends BasicComponentView {

    render(data: ConfirmMessageData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['confirmMessage.html']({
            message: data.message,
            positive: data.values?.positiveValue !== undefined ? data.values!.positiveValue : "Да",
            negative: data.values?.negativeValue !== undefined ? data.values!.negativeValue : "Нет",
        });

        return wrapper.querySelector('div')!;
    }
}
