import "../tmpl/emploeeCard.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo } from "../../common/types.js";

export type EmploeeCardInfo = {
    info?: EmploeeInfo,
}

/**
 * @class EmploeeCardView
 */
export default class EmploeeCardView extends BasicComponentView {

    render(info: EmploeeCardInfo): HTMLElement {
        const wrapper = document.createElement('div');
        const sign = info.info == undefined ? "Новый Сотрудник" : "Редактировать";
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['emploeeCard.html']({
            sign: sign,
            name: info?.info?.Name,
            surname: info?.info?.Surname,
            fathername: info?.info?.Fathername,
        });

        return wrapper.querySelector('div')!;
    }
}
