function query(name) {
    return name + query.value;
}

function call(cb) {
    query.value = 'asdf';
    const result = cb();
    query.value = undefined;
    return result;
}

console.log(call((a = query('Egor')) => a));