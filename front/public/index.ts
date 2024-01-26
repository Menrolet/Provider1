/* global Handlebars */

import { API } from "./common/consts.js";
import {PageLoaders} from "./modules/pageLoaders.js";
import { Queries } from "./modules/queries.js";
import Router from "./modules/router.js";
import Page from "./pages/_basic/page";

const router = new Router({
    mode: 'history',
    root: ''
});

let openedPage: Page;

router
    .add(API.requestsPage, (id: string) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.requestsPage(id);
        /*
        Queries.getEmploee(id).then(() => {
            openedPage = PageLoaders.requestsPage(id);
        }).catch((error) => {
            if (error === 404) {
                openedPage = PageLoaders.error404();
            }
        });
        */
    })
    .add('', () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.mainPage();
    })
    
// @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
Handlebars.registerHelper('isEqual', function (value1, value2) {
    console.log("Value1:" + JSON.stringify(value1));
    console.log("Value2:" +JSON.stringify(value2));
    return JSON.stringify(value1) === JSON.stringify(value2);
  });
    