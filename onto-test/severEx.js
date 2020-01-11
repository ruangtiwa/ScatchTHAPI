const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

let server = express();

server.get('/index', function(req, res, next) {
    res.send('Hello world from Express.js');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

