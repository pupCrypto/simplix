const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Engine } = require('../src/engine');
const { Router } = require('../src/http/router');
const { randomPort } = require('./utils');

describe('HttpProxy', () => {
    it('should handle request', async () => {
        const engine = new Engine();
        const engine1 = new Engine();

        const port = randomPort();
        const port1 = randomPort();

        const router = new Router();
        const router1 = new Router();

        router.proxy('/path', `http://localhost:${port1}/target`);
    });
});