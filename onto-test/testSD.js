// var stardog = require("stardog");
const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
let server = express();

const { Connection, query } = require('stardog');

const conn = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});

var data1;
 
query.execute(conn, 'scratchthai', 'select distinct ?s where { ?s a scth:Learner }', 'application/sparql-results+json')
.then(function(results){
  data1 = results.body.results.bindings;
  // console.log(data1);
  server.get('/index', function(req, res, next) {
    res.json(data1);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
