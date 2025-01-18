function body() {}

body.attach = (context) => body.context = context;
body.clear = () => body.context = undefined;

module.exports = {
    body,
};