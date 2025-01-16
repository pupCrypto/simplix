const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Engine } = require('../src/engine');
const { Router } = require('../src/http/router');
const { query } = require('../src/parsers');

describe('Engine', () => {
    it('should handle request', async () => {
        const engine = new Engine();
        const router = new Router();
        router.get('/test', () => {
            return 'Hello World';
        });
        engine.registerRouter(router);
        await engine.listen({ port: 8080 });
        const response = await fetch('http://localhost:8080/test');
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

        await engine.listen({ port: 8080 });
        const response = await fetch('http://localhost:8080/test?name=John+Doe');
        assert.equal(response.status, 200);
        assert.equal(response.statusText, 'OK');
        assert.equal(await response.text(), 'Hello John Doe');
        await engine.close();
    })
});