import "../tmpl/requestList.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class RequestListView
 */
export default class RequestListView extends BasicComponentView {
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['requestList.html']({});
        return wrapper.querySelector('div')!;
    }
}
