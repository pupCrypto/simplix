const assert = require('node:assert');
const net = require('node:net');
const { describe, it } = require('node:test');
const { HttpServer } = require('../src/http/server');
const { WRONG_HTTP_REQUEST } = require('../src/http/response-templates');
const { HttpResponse } = require('http-builder');

describe('HttpServer', () => {
    it('should return wrong http request response', async () => {
        const server = new HttpServer();
        await server.listen({ port: 8080 });

        const client = net.createConnection({ port: 8080 });
        client.on('data', async (data) => {
            assert.equal(data.toString(), WRONG_HTTP_REQUEST);
            await server.close();
        });
        client.write('test');
    });
    it('should emit request event', async () => {
        const server = new HttpServer();
        await server.listen({ port: 8081 });
        server.on('request', async (request, socket) => {
            assert.equal(request.startLine.uri, '/test');
            assert.equal(request.startLine.method, 'GET');
            socket.end((new HttpResponse).toString());
            await server.close();
        });
        const response = await fetch('http://localhost:8081/test');
        assert.equal(response.status, 200);
        assert.equal(response.statusText, 'OK');
    });
});