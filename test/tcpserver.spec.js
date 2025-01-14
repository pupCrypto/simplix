const assert = require('node:assert');
const net = require('node:net');
const { describe, it } = require('node:test');
const { TcpServer } = require('../src/tcp');

describe('TcpServer', () => {
    it('should get data', async () => {
        const server = new TcpServer();
        await server.listen({ port: 8080 });
        server.on('data-socket', async (data) => {
          assert.equal(data.toString(), 'test');
          await server.close();
        });
        const client = net.createConnection({ port: 8080 });
        client.end('test');
    });
});