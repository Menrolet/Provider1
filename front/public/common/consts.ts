const protocol = {
    http: 'http://',
    https: 'https://'
}
export const BaseUrl = '127.0.0.1' + ':8000';

export const BackendUrl = protocol.http + BaseUrl;
export const FrontUrl = protocol.http + BaseUrl;

export const APIurl = BackendUrl;

export const API = {
    root: /^$/,
    requestsPage: /requests\/([0-9]+)/,
}

export const APIStrings = {
    root: () => {return ''},
    requestsPage: (id: string) => {return '/requests/' + id},
}
