const { HttpResponse, PlainBody } = require('http-builder');
const { HttpServer } = require('./http');
const { bindContext, clearContext } = require('./parsers');
const { HttpProxy, WsProxy } = require('./proxy');


class Engine {
    constructor(echo=true) {
        this.server = new HttpServer(echo);
        this.server.on('request', this.httpRequestHandler.bind(this));
        this.routers = [];
        this.httpProxies = [];
        this.wsProxies = [];
    }
    async listen({ host, port }) {
        await this.server.listen({ host, port });
    }
    async close() {
        await this.server.close();
    }
    registerRouter(router) {
        this.routers.push(router);
    }
    registerProxy(proxy) {
        if (proxy instanceof HttpProxy) {
            this.httpProxies.push(proxy);
        } else if (proxy instanceof WsProxy) {
            this.wsProxies.push(proxy);
        } else {
            throw new Error('Invalid proxy type');
        }
    }

    async httpRequestHandler(request, socket) {
        const route = this.findRoute(request.startLine.path);
        if (route) {
            const response = new HttpResponse();
            bindContext({ request });
            response.body = this._getBody(await route.callback());
            clearContext();
            socket.end(response.toString());
        }
    }

    findRoute(path) {
        for (const router of this.routers) {
            const route = router.findRoute(path);
            if (route) {
                return route;
            }
        }
    }

    _getBody(handlerResult) {
        return new PlainBody(handlerResult.toString());
    }
}

module.exports = {
    Engine,
};