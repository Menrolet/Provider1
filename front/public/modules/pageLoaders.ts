import Main from "../pages/main/main.js";
import Page from "../pages/_basic/page";
import { Queries } from "./queries.js";
import RequestsPage from "../pages/requests/requestsPage.js";
import Page404 from "../pages/page404/page404.js";

const root = document.getElementsByTagName('body')[0];

export class PageLoaders {
    /**
     * Отрисовывает главную страницу
     */
    static mainPage(): Page {
        const page = new Main(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу запросов сотрудника
     */
    static requestsPage(id: string): Page {
        const page = new RequestsPage(root);
        page.render(id).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу ошибки 404
     */
    static error404(): Page {
        const page = new Page404(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }
}