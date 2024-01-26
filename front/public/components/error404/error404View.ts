import "../tmpl/error404.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class Error404View
 */
export default class Error404View extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['error404.html']({});

        return wrapper.querySelector('div')!;
    }
}
