function randomPort() {
    return Math.floor(Math.random() * (65535 - 1024) + 1024);
}

module.exports = {
    randomPort,
};