const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Simplix } = require('../src/core');

describe('Simplix', () => {
  it('should add get router', () => {
    const simplix = new Simplix();
    simplix.get('/get-route', () => {
      return 'Hello World';
    });
  });
});
