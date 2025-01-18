const { HttpRequest: RequestParser } = require('http-builder');
const { TcpServer } = require('../tcp');
const { WRONG_HTTP_REQUEST } = require('./response-templates');

class HttpServer extends TcpServer {
    constructor(echo=true) {
        super(echo);
        this.on('data-socket', (data, socket) => {
            if (socket.isWs) {
                return this.emit('ws-data', data, socket);
            }
            try {
                var request = RequestParser.parseString(data.toString());
            } catch(e) {
                return socket.end(WRONG_HTTP_REQUEST);
            }
            if (request.headers.findHeader('Upgrade')?.value.toLowerCase() === 'websocket') {
                socket.isWs = true;
                return this.emit('ws-request', request, socket);
            }
            this.emit('request', request, socket);
        });
        this.on('request', (request) => {
            this.echo && console.log(`HTTP ${request.startLine.method} ${request.startLine.uri}`);
        });
    }
}

module.exports = {
    HttpServer,
};