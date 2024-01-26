import "../tmpl/requestListElement.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo, RequestInfo } from "../../common/types.js";

/**
 * @class RequestListElementView
 */
export default class RequestListElementView extends BasicComponentView {
    render(data: RequestInfo): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['requestListElement.html']({
            ID: data.ID,
            Address: data.address,
            Type: data.reqType.Name,
            Weight: data.reqType.Weight,
        });
        return wrapper.querySelector('div')!;
    }
}
