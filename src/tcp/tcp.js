const net = require('net');


class TcpServer extends net.Server {
    constructor(echo = true) {
        super();
        this.echo = echo;
        this._onData = () => {};
        this.initCbs();
    }
    /**
     * Start listening on the given host and port
     * @param {{  host: string, port: number }} options
     */
    async listen(options) {
        return new Promise(resolve => {
            super.listen(options.port, options.host, () => {
                this.echo && console.log(`TCP server listening on ${options.host}:${options.port}`);
                resolve();
            });
        });
    }

    async receive() {

    }

    onConnection(socket) {
        this.echo && console.log(`New TCP connection from ${socket.remoteAddress}:${socket.remotePort}`);
        socket.on('close', () => {
            this.echo && console.log(`TCP connection from ${socket.remoteAddress}:${socket.remotePort} closed`);
        });
        socket.on('data', (data) => {
            this._onData(data, socket);
        });
    }

    set onData(callback) {
        this._onData = callback;
    }

    initCbs() {
        this.on('connection', this.onConnection.bind(this));
    }
}


module.exports = {
    TcpServer,
};
