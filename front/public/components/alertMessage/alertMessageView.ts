import "../tmpl/alertMessage.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

export type AlertMessageData = {
    message: string,
    buttonValue?: string,
}
/**
 * @class AlertMessageView
 */
export default class AlertMessageView extends BasicComponentView {

    render(data: AlertMessageData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['alertMessage.html']({
            message: data.message,
            buttonValue: data.buttonValue !== undefined ? data.buttonValue : "OK",
        });

        return wrapper.querySelector('div')!;
    }
}
