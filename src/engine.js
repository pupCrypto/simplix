const { HttpResponse, PlainBody } = require('http-builder');
const { HttpServer } = require('./http');
const { bindContext, clearContext } = require('./parsers');


class Engine {
    constructor(echo=true) {
        this.server = new HttpServer(echo);
        this.server.on('request', this.httpRequestHandler.bind(this));
        this.routers = [];
        this.proxies = [];
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
        this.proxies.push(proxy);
    }

    async httpRequestHandler(request, socket) {
        const route = this.findRoute(request.startLine.uri);
        if (route) {
            bindContext({ request });
            const result = await route.callback(request, socket);
            clearContext();
            const response = new HttpResponse();
            response.body = new PlainBody(result.toString());
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
}

module.exports = {
    Engine,
};