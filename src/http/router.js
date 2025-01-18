const { HttpProxy, WsProxy } = require('../proxy');

class Router {
    /**
     * 
     * @param {boolean} strict If true, the router will throw an error if the path is already exists
     */
    constructor(strict=true) {
        this.routes = [];
        this.proxies = [];
    }

    get(path, callback) {
        this.addRoute(this._buildRoute('GET', path, callback));
    }
    post(path, callback) {
        this.addRoute(this._buildRoute('POST', path, callback));
    }
    put(path, callback) {
        this.addRoute(this._buildRoute('PUT', path, callback));
    }
    delete(path, callback) {
        this.addRoute(this._buildRoute('DELETE', path, callback));
    }
    patch(path, callback) {
        this.addRoute(this._buildRoute('PATCH', path, callback));
    }
    ws(path, acceptCallback, callback) {
        this.addRoute(this._buildWsRoute('WS', path, acceptCallback, callback));
    }
    proxy(path, target) {  // TODo: need to add route here
        const url = new URL(target);
        if (url.protocol === 'http:') {
            this.addProxy({ path, target, type: 'http'});
        } else if (url.protocol === 'ws:') {
            this.addProxy({ path, target, type: 'ws'});
        } else {
            throw new Error('Unsupported proxy protocol');
        }
    }
    addRoute(route) {
        if (this.strict && this.routes.find(r => r.path === route.path)) {
            throw new Error('Route already exists');
        }
        this.routes.push(route);
    }

    findRoute(path) {
        return this.routes.find(r => r.path === path);
    }

    findWs(path) {
        return this.wss.find(r => r.path === path);
    }

    findProxy(path) {
        return this.proxies.find(p => p.path === path);
    }

    _buildRoute(method, path, callback) {
        return {
            method,
            path,
            callback,
        };
    }
    /**
     * 
     * @param {string} method Must be 'WS' 
     * @param {string} path 
     * @param {Function | Promise<boolean>} acceptCallback Accept function that will be called when the client sends the upgrade request and must return boolean value accept or not
     * @param {Function | Promise<any>} callback Callback function that will be called when the client sends any data if connection is accepted 
     * @returns 
     */
    _buildWsRoute(method, path, acceptCallback, callback) {
        return {
            method,
            path,
            acceptCallback,
            callback,
        };
    }
}

module.exports = {
  Router,
};