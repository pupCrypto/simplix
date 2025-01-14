const smthGlobal = {}

function query(name) {
    console.log(arguments);
    console.log(name);
    console.log(query.request);
    return 1;
}

function cb(a=query()) {}

(() => {
    const req = 'asdf';
    query.request = req;
    cb();
})()