import "../tmpl/emploeeListElementEmpty.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo } from "../../common/types.js";

/**
 * @class EmploeeListElementEmptyView
 */
export default class EmploeeListElementEmptyView extends BasicComponentView {
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['emploeeListElementEmpty.html']({});
        return wrapper.querySelector('div')!;
    }
}
