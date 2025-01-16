const assert = require('node:assert');
const { describe, it } = require('node:test');
const { query } = require('../src/parsers');
const { HttpRequest } = require('http-builder');

describe('Query parser', () => {
    it('should attach request and clear it', () => {
        const request = { startLine: { query: { get: () => 'John Doe' } } };
        query.attach({ request });
        assert.equal(query.context.request, request);
        query.clear();
        assert.equal(query.context, undefined);
    });
    it('should return default value', () => {
        query.attach({ request: { startLine: { query: { get: () => undefined } } } });
        assert.equal(query('name', 'John Doe'), 'John Doe');
        query.clear();
    });
    it('should return query value', () => {
        query.attach({ request: { startLine: { query: { get: () => 'John Doe' } } } });
        assert.equal(query('name'), 'John Doe');
        query.clear();
    });
    it('should parse real request example and return proper query value', () => {
        const request = HttpRequest.parseString('GET /test?name=John+Doe HTTP/1.1\r\nHost: example.com\r\n\r\n');
        query.attach({ request });
        assert.equal(query('name'), 'John Doe');
        query.clear();
    });
});