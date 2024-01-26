import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/navbar.tmpl.js";

/**
 * @class NavbarView
 */
export default class NavbarView extends BasicComponentView {

    render(label?: {label: string}): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['navbar.html']({
            label: label?.label,
        });
        return wrapper.querySelector('div')!;
    }
}
