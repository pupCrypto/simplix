const { TcpServer } = require('../tcp');

class HttpServer extends TcpServer {
    constructor(echo=true) {
        super(echo);
    }
}