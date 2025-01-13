const net = require('net');


class Server extends net.Server {
    constructor(echo=true) {
        this.echo = echo;
    }
    /**
     * 
     * @param {string} host 
     * @param {number} port 
     */
    listen(host, port) {
        super.listen(port, host);
    }
}


module.exports = {
    Server,
};
