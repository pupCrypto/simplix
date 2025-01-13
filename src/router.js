class Router {
    /**
     * 
     * @param {boolean} strict If true, the router will throw an error if the path is already exists
     */
    constructor(strict=true) {
        this.routes = [];
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

    addRoute(route) {
        // check if the route already exists
        if (this.strict && this.routes.find(r => r.path === route.path)) {
            throw new Error('Route already exists');
        }
        this.routes.push(route);
    }

    _buildRoute(method, path, callback) {
        return {
            method,
            path,
            callback,
        };
    }
}

module.exports = {
  Router,
};