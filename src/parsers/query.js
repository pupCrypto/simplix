/**
 * 
 * @param {string} name Name of the query parameter
 * @param {string | number | boolean} defaultValue Default value for query parameter if it is not found in the request
 * @param {boolean} required Weather the query parameter is required
 * @param {string | number | boolean} type Type of the query parameter. Can be string, number, boolean...
 * @returns 
 */
function query(name, defaultValue, required=false, type='string') {
    if (defaultValue && required) {
        throw new Error(`Query parameter "${name}" cannot be required and have a default value`);
    }
    const value = query.request.uri.query[name];
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

query.attach = (req) => query.request = req;
query.clear = () => query.request = undefined;

module.exports = {
    query,
};
