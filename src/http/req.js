const { RequestParser: HttpRequest } = require('http-builder');

class Request {
    constructor(parser = new RequestParser()) {
        this.parser = parser;
    }
}

module.exports = {
    Request,
};