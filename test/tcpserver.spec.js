const assert = require('node:assert');
const net = require('node:net');
const { describe, it } = require('node:test');
const { TcpServer } = require('../src/tcp');

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

describe('TcpServer', () => {
    it('should listen on port', async () => {
        const server = new TcpServer();
        await server.listen({ port: 8080 });
        server.onData = async (data) => {
          assert.equal(data.toString(), 'test');
          await server.close();
        };
        const client = net.createConnection({ port: 8080 });
        client.end('test');
    });
});