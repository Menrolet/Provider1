import "../tmpl/newEmployeeButton.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class NewEmployeeButtonView
 */
export default class NewEmployeeButtonView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['newEmployeeButton.html']({});
        return wrapper.querySelector('div')!;
    }
}
