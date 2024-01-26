export default class Router {
    routes: { path: RegExp | string, handler: any }[] = [];
    root: string = '/';
    #current: string;
    mode: 'history' | 'hash';

    constructor(options: any) {
        if (options.root) this.root = options.root;
        this.mode = 'history';
        if (options.mode) this.mode = options.mode;
        this.#current = '/';
        this.listen();
    }

    add = (path: RegExp | string, handler: any) => {
        this.routes.push({path, handler});
        return this;
    };

    remove = (path: string) => {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);
                return this;
            }
        }
        return this;
    };

    flush = () => {
        this.routes = [];
        return this;
    };

    clearSlashes = (path: string) =>
        path.toString()
            .replace(/\/$/, '')
            .replace(/^\//, '');

    getFragment = () => {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
            //fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    };

    listen = () => {
        // @ts-ignore
        clearInterval(this.interval);
        // @ts-ignore
        this.interval = setInterval(this.interval, 50);
    };

    interval: () => any = () => {
        if (this.#current === this.getFragment()) return;
        this.#current = this.getFragment();
        this.routes.some(route => {
            const match = this.#current.match(route.path);
            if (match) {
                match.shift();
                route.handler.apply({}, match);
                return match;
            }
            return false;
        });
    };
}
