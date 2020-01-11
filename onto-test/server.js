const http = require('http');
const { Connection, query } = require('stardog');

const hostname = '127.0.0.1';
const port = 3000;

const conn = new Connection({
    username: 'admin',
    password: 'admin',
    endpoint: 'http://localhost:5820',
  });

  var data = query.execute(conn, 'scratchthai', 'select distinct ?s where { ?s ?p ?o }');

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'sparql-results+json' });
    
    res.write(body.results.bindings);
    
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/*var http = require('http'); 

const { Connection, query } = require('stardog');

const conn = new Connection({
    username: 'admin',
    password: 'admin',
    endpoint: 'http://localhost:5820',
  });

  query.execute(conn, 'scratchthai', 'select distinct ?s where { ?s ?p ?o }').then(({ body }) => {
    console.log(body.results.bindings);
  });;
  //const result = JSON.stringify(data);
  //console.log(data.result);*/

/*var server = http.createServer(function (req, res) {   
   
    if (req.url == '/data') { //check the URL of the current request
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(result.toString());  
            res.end();  
    }
});

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')   */

