const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Engine } = require('../src/engine');
const { Router } = require('../src/http/router');
const { query } = require('../src/parameters');
const { randomPort } = require('./utils');
const WebSocket = require('ws');

describe('http Engine', () => {
    it('should handle request', async () => {
        const engine = new Engine();
        const router = new Router();
        router.get('/test', () => {
            return 'Hello World';
        });
        engine.registerRouter(router);
        const port = randomPort();
        await engine.listen({ port });
        const response = await fetch(`http://localhost:${port}/test`);
        assert.equal(response.status, 200);
        assert.equal(response.statusText, 'OK');
        assert.equal(await response.text(), 'Hello World');
        await engine.close();
    });
    it('should handle request with query', async () => {
        const engine = new Engine();
        const router = new Router();
        router.get('/test', (name=query('name')) => {
            return `Hello ${name}`;
        });
        engine.registerRouter(router);
        const port = randomPort();

        await engine.listen({ port });
        const response = await fetch(`http://localhost:${port}/test?name=John+Doe`);
        assert.equal(response.status, 200);
        assert.equal(response.statusText, 'OK');
        assert.equal(await response.text(), 'Hello John Doe');
        await engine.close();
    })
});

describe('ws Engine', () => {
    it('should handle ws request', async () => {
        const engine = new Engine();
        const port = randomPort();
        const router = new Router();
        router.ws('/test', () => true, (data) => {
            console.log(data);
            return 'Hello World';
        });
        engine.registerRouter(router);
        await engine.listen({ port });
        const ws = new WebSocket(`ws://localhost:${port}/test`);
        ws.on('open', () => {
            ws.send('Hello World');
            ws.on('message', (data) => {
                assert.equal(data, 'Hello World');
                ws.close();
            });
        });
    });
});