import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import Error404 from "../../components/error404/error404.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class Page404View
 */
export default class Page404View extends PageView {
    mainContentElement: HTMLElement | undefined;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render() {
        super.render();
        const navbar = new Navbar();
        await navbar.render();
        this.children.set('navbar', navbar);
        this.root.appendChild(navbar.root);

        const rootEl = document.createElement('div');
        rootEl.id = 'root';
        rootEl.classList.add('error_page');
        this.root.appendChild(rootEl);
        this.root = rootEl;

        this.root.appendChild(document.createElement('div'));

        const mainContentElement = document.createElement('div');
        const errorContent = new Error404();
        errorContent.render();
        errorContent.subscribe();
        mainContentElement.appendChild(errorContent.root);
        this.mainContentElement = mainContentElement;
        this.root.appendChild(this.mainContentElement);

        this.root.appendChild(document.createElement('div'));
    }
}