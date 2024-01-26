import "../tmpl/requestCard.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import { EmploeeInfo, ReqType, RequestInfo } from "../../common/types.js";

export type RequestCardInfo = {
    info?: RequestInfo,
    emploees: EmploeeInfo[],
    types: ReqType[],
}

/**
 * @class RequestCardView
 */
export default class RequestCardView extends BasicComponentView {

    render(info: RequestCardInfo): HTMLElement {
        const wrapper = document.createElement('div');
        const isNewRequest : boolean = info.info === undefined;
        const sign = isNewRequest ? "Новый Запрос" : "Редактировать";
        

        const today: string = (new Date()).toISOString().split("T")[0];
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['requestCard.html']({
            sign: sign,
            emploees: info.emploees,
            types: info.types,
            address: isNewRequest ? "" : info.info!.address,
        });

        let selectedOption: number = 0;
        for(let i = 0; i < info.emploees.length; ++i){
            if (info.emploees[i].ID === info?.info?.Assigner.ID){
                selectedOption = i;
                break;
            }
        };
        (wrapper.querySelector("#emploee_form") as HTMLSelectElement).selectedIndex = selectedOption;

        for(let i = 0; i < info.types.length; ++i){
            if (info.types[i].ID === info?.info?.reqType.ID){
                selectedOption = i;
                break;
            }
        };
        (wrapper.querySelector("#equipment_form") as HTMLSelectElement).selectedIndex = selectedOption;

        return wrapper.querySelector('div')!;
    }
}
