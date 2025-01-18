function ws() {}

ws.attach = (context) => ws.context = context;
ws.clear = () => delete ws.context;

module.exports = {
    ws,
};