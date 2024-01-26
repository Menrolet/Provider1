import "../tmpl/requestListElementEmpty.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo } from "../../common/types.js";

/**
 * @class RequestListElementEmptyView
 */
export default class RequestListElementEmptyView extends BasicComponentView {
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['requestListElementEmpty.html']({});
        return wrapper.querySelector('div')!;
    }
}
