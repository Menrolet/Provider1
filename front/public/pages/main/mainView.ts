import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import Sidebar from "../../components/sideBar/sidebar.js";
import EmploeeList from "../../components/emploeeList/emploeeList.js";
import { Queries } from "../../modules/queries.js";

/**
 * Страница содержит главный компонент.
 * @class MainView
 */
export default class MainView extends PageView {
    mainContentElement: HTMLElement | undefined;
    sideContentElement: HTMLElement | undefined;

    constructor(root: HTMLElement) {
        super(root);
    }

    async render() {
        await super.render();
        const navbar = new Navbar();
        await navbar.render({label: "Сотрудники"});
        this.root.appendChild(navbar.root);

        const rootEl = document.createElement('div');
        rootEl.id = 'root';
        rootEl.classList.add('root');
        this.root.appendChild(rootEl);
        this.root = rootEl;

        this.root.appendChild(document.createElement('div'));

        const mainContentElement = document.createElement('div');
        mainContentElement.classList.add('mainList');
        this.mainContentElement = mainContentElement;
        this.root.appendChild(this.mainContentElement);

        const sideContentElement = document.createElement('div');
        sideContentElement.classList.add('sideList');
        this.sideContentElement = sideContentElement;
        this.root.appendChild(this.sideContentElement);

        const sidebar: Sidebar = new Sidebar();
        this.sideContentElement.appendChild(sidebar.render());
        sidebar.subscribe();

        this.root.appendChild(document.createElement('div'));
        this.children.set('navbar', navbar);

        const emploeeList: EmploeeList = new EmploeeList();
        this.mainContentElement.appendChild(emploeeList.render(await Queries.getEmploeeList()));
    }
}