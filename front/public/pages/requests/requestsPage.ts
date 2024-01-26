import {Events} from "../../modules/events.js";
import { Queries } from "../../modules/queries.js";
import Page from "../_basic/page.js";
import RequestsPageView from "./requestsPageView.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class RequestsPage
 */
export default class RequestsPage extends Page{
    view: RequestsPageView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new RequestsPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     */
    async render(id: string) {
        Events.scrollUp();
        const emploee = await Queries.getEmploee(id);
        await this.view.render(emploee);
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
    }
}