import "../tmpl/emploeeList.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class EmploeeListView
 */
export default class EmploeeListView extends BasicComponentView {
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['emploeeList.html']({});
        return wrapper.querySelector('div')!;
    }
}
