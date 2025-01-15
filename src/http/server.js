const { HttpRequest: RequestParser } = require('http-builder');
const { TcpServer } = require('../tcp');
const { WRONG_HTTP_REQUEST } = require('./response-templates');

class HttpServer extends TcpServer {
    constructor(echo=true) {
        super(echo);
        this.on('data-socket', (data, socket) => {
            try {
                this.emit('request', RequestParser.parseString(data.toString()), socket);
            } catch(e) {
                socket.end(WRONG_HTTP_REQUEST);  // TODO: need to end connection by proper http response
            }
        });
        this.on('request', (request) => {
            console.log(`HTTP ${request.startLine.method} ${request.startLine.uri}`);
        });
    }
}

module.exports = {
    HttpServer,
};