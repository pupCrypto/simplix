const { Engine } = require('./engine');
const { Router } = require('./router');

class Simplix {
    constructor(echo=true) {
        this.rootRouter = new Router();
        this.engine = new Engine(echo);
    }

    get(path, callback) {
        this.rootRouter.get(path, callback);
    }
    post(path, callback) {
        this.rootRouter.post(path, callback);
    }
    put(path, callback) {
        this.rootRouter.put(path, callback);
    }
    delete(path, callback) {
        this.rootRouter.delete(path, callback);
    }
    patch(path, callback) {
        this.rootRouter.patch(path, callback);
    }
    listen(host, port) {
        this.engine.listen(host, port);
    }
    addRouter(router) {
        this.engine.registerRouter(router);
    }
}

module.exports = {
    Simplix,
};
