import {APIStrings, FrontUrl} from "../common/consts.js";

export class URIChanger {
    /**
     * Перемещает на главную
     */
    static mainPage() {
        window.history.pushState(null, '', FrontUrl + APIStrings.root());
    }

    /**
     * Перемещает на страницу запросов
     */
    static requestsPage(id: string) {
        window.history.pushState(null, '', FrontUrl + APIStrings.requestsPage(id));
    }

}
