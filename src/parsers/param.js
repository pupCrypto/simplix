function param() {}

param.attach = (context) => param.context = context;
param.clear = () => param.context = undefined;

module.exports = {
    param,
};