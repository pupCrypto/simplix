/**
 * 
 * @param {string} name Name of the query parameter
 * @param {string | number | boolean} defaultValue Default value for query parameter if it is not found in the request
 * @param {boolean} required Weather the query parameter is required
 * @param {string | number | boolean} type Type of the query parameter. Can be string, number, boolean...
 * @returns 
 */
function query(name, defaultValue, required=false, type='string') {
    if (!name) {
        throw new Error('Query parameter name is required');
    }
    if (defaultValue && required) {
        throw new Error(`Query parameter "${name}" cannot be required and have a default value`);
    }
    const value = query.context.request.startLine.query.get(name);
    if (required && !value) {
        throw new Error(`Query parameter "${name}" is required`);
    }
    if (value && type === 'string') {
        return value;
    }
    if (value && type === 'number') {
        return Number(value);
    }
    if (value && type === 'boolean') {
        return value === 'true';
    }
    return defaultValue;
}

query.attach = (context) => query.context = context;
query.clear = () => query.context = undefined;

module.exports = {
    query,
};
