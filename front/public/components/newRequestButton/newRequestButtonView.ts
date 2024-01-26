import "../tmpl/newRequestButton.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class NewRequestButtonView
 */
export default class NewRequestButtonView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['newRequestButton.html']({});
        return wrapper.querySelector('div')!;
    }
}
