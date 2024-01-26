/**
 * View для соответсвующих страниц
 * @class PageView
 */
import BasicComponent from "../../components/_basicComponent/basicComponent";

export default class PageView {
    children: Map<string, BasicComponent>;
    root: HTMLElement;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        this.root = root;
        this.children = new Map();
    }

    /**
     * Нарисовать страницу
     */
    render(parameters?: object): void {
        this.root.innerHTML = '';
    }
}