const assert = require('node:assert');
const { describe, it } = require('node:test');
const { query } = require('../src/parsers/query');
const { Router } = require('../src/router');

describe('Router get', () => {
    it('should add get route', () => {
        const router = new Router();
        router.get('/test', (a = query('name')) => {
            
        });
    });
});