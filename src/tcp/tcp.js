const net = require('net');


class TcpServer extends net.Server {
    constructor(echo = true) {
        super();
        this.echo = echo;
        this.on('connection', (socket) => {
            this.echo && console.log(`New TCP connection from ${socket.remoteAddress}:${socket.remotePort}`);
            socket.on('close', () => {
                this.echo && console.log(`TCP connection from ${socket.remoteAddress}:${socket.remotePort} closed`);
            });
            socket.on('data', (data) => {
                this.emit('data-socket', data, socket);
            });
        });
    }
    /**
     * Start listening on the given host and port
     * @param {{  host: string, port: number }} options
     */
    async listen({ host='localhost', port }) {
        return new Promise(resolve => {
            super.listen(port, host, () => {
                this.echo && console.log(`TCP server listening on ${host}:${port}`);
                resolve();
            });
        });
    }

    async close() {
        return new Promise(resolve => {
            super.close(() => {
                this.echo && console.log('TCP server closed');
                resolve();
            });
        });
    }
}


module.exports = {
    TcpServer,
};
