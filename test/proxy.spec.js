const assert = require('node:assert');
const { describe, it } = require('node:test');
const { HttpProxy } = require('../src/proxy');
const { Engine } = require('../src/engine');
const { Router } = require('../src/http/router');

describe('HttpProxy', () => {
    it('should handle request', async () => {
        const proxy = new HttpProxy();
        proxy.redirect('/path', 'http://localhost:8081/target');
        
        const engine = new Engine();
        const engine1 = new Engine();
        const router = new Router();
        router.get('/target', () => 'Hello World');

        engine.registerProxy(proxy);
        engine1.registerRouter(router);

        await engine.listen({ port: 8080 });
        await engine1.listen({ port: 8081 });

        const response = await fetch('http://localhost:8080/path');
        assert.equal(response.status, 200);
        assert.equal(response.statusText, 'OK');
        assert.equal(await response.text(), 'Hello World');

        await engine.close();
        await engine1.close();
    });
});