const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Proxy } = require('../src/proxy');

describe('Proxy', () => {
    it('should handle request', async () => {
        const proxy = new Proxy();
        proxy.redirect('/path', 'http://localhost:8080/some-target');
    });
});