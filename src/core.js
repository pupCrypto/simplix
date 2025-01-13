const { Router } = require('./router');
const { Web } = require('./web');


class Simplix {
    constructor() {
        this.rootRouter = new Router();
    }

    get(path, callback) {
        this.rootRouter.get(path, callback);
    }
    post(path, callback) {
        this.rootRouter.post(path, callback);
    }
}

module.exports = {
    Simplix,
};
