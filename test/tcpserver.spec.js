const assert = require('node:assert');
const { describe, it } = require('node:test');
const { TcpServer } = require('../src/tcp');

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

describe('TcpServer', () => {
    it('should listen on port', async () => {
        const server = new TcpServer();
        await server.listen({ port: 8080 });
        const stream = new ReadableStream({
            async start(controller) {
              await wait(1000);
              controller.enqueue('This ');
              await wait(1000);
              controller.enqueue('is ');
              await wait(1000);
              controller.enqueue('a ');
              await wait(1000);
              controller.enqueue('slow ');
              await wait(1000);
              controller.enqueue('request.');
              controller.close();
            },
          }).pipeThrough(new TextEncoderStream());
          
          fetch('http://localhost:8080', {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: stream,
            duplex: 'half',
          });
        server.onData = (data) => {
            console.log(data.toString());
        };
    });
});