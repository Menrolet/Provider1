import "../tmpl/emploeeListElement.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo } from "../../common/types.js";

/**
 * @class EmploeeListView
 */
export default class EmploeeListElementView extends BasicComponentView {
    render(emploee: EmploeeInfo): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['emploeeListElement.html']({
            ID: emploee.ID,
            Name: emploee.Surname + " " + emploee.Name + " " + emploee.Fathername,
        });
        return wrapper.querySelector('div')!;
    }
}
