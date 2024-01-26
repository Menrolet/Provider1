import {FrontUrl} from "../../common/consts.js";

/**
 * @class BasicComponentView
 */
export default class BasicComponentView {
    baseUrl: string;

    /**
     * Конструктор
     */
    constructor() {
        this.baseUrl = FrontUrl;
    }
    /**
     * Отрисовка компонента
     */
    render(parameters?: object): HTMLElement {
        return document.createElement('div');
    }
}
