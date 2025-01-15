class Proxy {
    constructor() {
        this.redirects = [];
    }

    redirect(path, target) {
        this.redirects.push({ path, target });
    }
}

class HttpProxy extends Proxy {}

class WsProxy extends Proxy {}


module.exports = {
    Proxy,
    HttpProxy,
    WsProxy,
};