const { Web } = require('./web');


class Engine {
    constructor(echo=true) {
        this.web = new Web(echo);
    }
    listen(host, port) {
        this.web.listen(host, port);
    }
    registerRouter(router) {
    }
}

module.exports = {
    Engine,
};