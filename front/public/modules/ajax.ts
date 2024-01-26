import {RequestAnswer} from "../common/types";
import {APIurl} from "../common/consts.js";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const csrfHeader = "X-XSRF-Token";

export type requestParams = {
    url: string;
    data?: object;
    method?: string;
};

export class Ajax {
    constructor() {
    }

    get(params: requestParams): Promise<void | RequestAnswer> {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.GET;
        return this.#ajax(parameters);
    }

    post(params: requestParams): Promise<void | RequestAnswer> {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.POST;
        return this.#ajax(parameters);
    }

    #ajax(params: requestParams): Promise<void | RequestAnswer> {
        const url = new URL(APIurl + (params.url || '/'));
        if (params.data !== undefined){
            Object.keys(params.data).forEach(key => {
                // @ts-ignore
                if (params.data[key] === undefined) {
                    // @ts-ignore
                    delete params.data[key];
                }
            });
        }

        if (params.method == REQUEST_TYPE.GET){
            url.search = new URLSearchParams({...params.data}).toString();
        }

        let fetchParams: object = {
            method: params.method,
            body: params.method == REQUEST_TYPE.POST ? JSON.stringify(params.data) : null,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
        };

        let status: number = 0;

        const response = fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1){
                    return response.json();
                }
                return status;
            })
            .then((response) => {
                const result: RequestAnswer = {
                    status: status,
                    response: response,
                }
                if (status === 401) {
                    window.sessionStorage.clear();
                }
                return result;
            })
            .catch((error) => {
                console.warn(error);
            });
        return response!;
    }
}
