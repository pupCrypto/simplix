class Proxy {
    constructor() {
        if (new.target === Proxy) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.redirects = [];
    }

    /**
     * Redirects traffic from path to target
     * @param {*} path Relative path of the current server
     * @param {*} target Absolute path of the target server
     */
    redirect(path, target) {
        throw new Error('Not implemented');
    }
}

class HttpProxy extends Proxy {
    redirect(path, target) {
        this.redirects.push({ path, target });
    }
}

class WsProxy extends Proxy {
    redirect(path, target) {
        this.redirects.push({ path, target });
    }
}


module.exports = {
    Proxy,
    HttpProxy,
    WsProxy,
};