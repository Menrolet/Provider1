import "../tmpl/sidebar.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class SidebarView
 */
export default class SidebarView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['sidebar.html']({});

        return wrapper.querySelector('div')!;
    }
}
