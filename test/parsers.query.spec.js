const assert = require('node:assert');
const { describe, it } = require('node:test');
const { query } = require('../src/parsers');

describe('Query parser', () => {
    it('should attach request and clear it', () => {
        const request = { uri: { query: {} } };
        query.attach(request);
        assert.equal(query.request, request);
        query.clear();
        assert.equal(query.request, undefined);
    });
    it('should return default value', () => {
        query.attach({ uri: { query: {} } });
        assert.equal(query('name', 'John Doe'), 'John Doe');
        query.clear();
    });
    it('should return query value', () => {
        query.attach({ uri: { query: { name: 'John Doe' } } });
        assert.equal(query('name'), 'John Doe');
        query.clear();
    });
});