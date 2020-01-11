const { Connection, query } = require('stardog');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const conn = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});
 
query.execute(conn, 'scratchthai', 'select distinct ?s where { ?s ?p ?o }', 'application/sparql-results+json')
.then(({ body }) => {   console.log(body.results); } );

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.json(JSON.stringify(results));
    
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

