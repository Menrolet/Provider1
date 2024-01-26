import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import Sidebar from "../../components/sideBar/sidebar.js";
import { EmploeeInfo } from "../../common/types.js";
import { Queries } from "../../modules/queries.js";
import RequestList from "../../components/requestList/requestList.js";

/**
 * Страница содержит главный компонент.
 * @class RequestsPageView
 */
export default class RequestsPageView extends PageView {
    mainContentElement: HTMLElement | undefined;
    sideContentElement: HTMLElement | undefined;

    constructor(root: HTMLElement) {
        super(root);
    }

    async render(emploee: EmploeeInfo) {
        await super.render();
        const navbar = new Navbar();
        const label: string = "Запросы сотрудника " + emploee.Name + " " + emploee.Surname + " " + emploee.Fathername + " ID: " + emploee.ID;
        await navbar.render({label: label});
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

        const requestList: RequestList = new RequestList();
        this.mainContentElement.appendChild(requestList.render(await Queries.getRequestList(emploee.ID)));
    }
}