const { HttpRequest: RequestParser } = require('http-builder');
const { TcpServer } = require('../tcp');

class HttpServer extends TcpServer {
    constructor(echo=true) {
        super(echo);
        this.initCbs();
    }

    initCbs() {
        this.onData = (data, socket) => {
            try {
                this.emit('request', RequestParser.parseString(data.toString()));
            } catch(e) {
                socket.end('Wrong Http request');  // TODO: need to end connection by proper http response
            }
        };
    }
}

module.exports = {
    HttpServer,
};