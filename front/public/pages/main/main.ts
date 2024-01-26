import MainView from "./mainView.js";
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Main
 */
export default class Main extends Page{
    view: MainView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new MainView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     */
    async render() {
        Events.scrollUp();

        await this.view.render();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
    }
}