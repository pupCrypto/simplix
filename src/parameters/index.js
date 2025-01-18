const { query } = require('./query');
const { body } = require('./body');
const { param } = require('./param');

function bindContext(context) {
    query.attach(context);
    body.attach(context);
    param.attach(context);
}

function clearContext() {
    query.clear();
    body.clear();
    param.clear();
}

module.exports = {
    query,
    body,
    param,
    bindContext,
    clearContext,
}