const { HttpResponse, PlainBody } = require('http-builder');
const { HttpServer } = require('./http');
const { bindContext, clearContext } = require('./parameters');


class Engine {
    constructor(echo=true) {
        this.server = new HttpServer(echo);
        this.server.on('request', this.httpRequestHandler.bind(this));
        this.server.on('ws-request', this.wsRequestHandler.bind(this));
        this.server.on('ws-data', this.wsDataHandler.bind(this));
        this.routers = [];
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

    async wsRequestHandler(request, socket) {
        const ws = this.findWs(request.startLine.path);
        if (ws) {
            socket.callback = ws.callback;
            if (!await ws.acceptCallback()) {
                return socket.end(); // TODO: need to send proper response
            }
        }
    }

    async wsDataHandler(data, socket) {
        const result = await socket?.callback(data); 
        socket.write(result);
    }


    findRoute(path) {
        for (const router of this.routers) {
            const route = router.findRoute(path);
            if (route) {
                return route;
            }
        }
    }
    findWs(path) {
        for (const router of this.routers) {
            const ws = router.findWs(path);
            if (ws) {
                return ws;
            }
        }
    }
    findProxy(path) {
        for (const router of this.routers) {
            const proxy = router.findProxy(path);
            if (proxy) {
                return proxy;
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