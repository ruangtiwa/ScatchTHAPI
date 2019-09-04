const JsonFind = require('json-find');
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

// Loging API
server.get('/login/username=:username&password=:password', function(req, res, next) {

    const username =    [{ user: 
                            {
                                type: 'literal',
                                value: req.params.username
                            }
                        }];
    const password =    [{ pass: 
                            {
                                type: 'literal',
                                value: req.params.password
                            }
                        }];

    const docUsername = JsonFind(username);
    const docPassword = JsonFind(password);
    var equal = false; // if true 'username' is existing

    // console.log(doc.findValues('value'));
        
    query.execute(conn, 'scratchthai', 
    'select ?user ?pass where { ?s a scth:Learner. ?s scth:hasLearnerPersonalInformation ?info. ?info scth:Username ?user. ?info scth:Password ?pass. }',
    'application/sparql-results+json')
    .then( (data2) => {   
                            const allData = data2.body.results.bindings;
                            const getUsername = docUsername.findValues('value');
                            const getPassword = docPassword.findValues('value');
                            // var equal = false;
                            
                            for(var i=0; i<allData.length; i++) {  

                                if (allData[i].user.value == getUsername.value) { //check username
                                    console.log(allData[i].user.value)
                                    console.log('Existing username')
                                    if (allData[i].pass.value == getPassword.value) { // check password
                                        console.log(allData[i].pass.value)
                                        console.log('Existing username&password')
                                        equal = true;
                                    }
                                }

                                // console.log(obj1[i].user.value);
                                // console.log(obj2.value);
                            }
                            // console.log(equal);
                            res.send(equal); 
                        }) 
    .catch(function(err) {
    console.log('error: ', err);
    }); 
});
// End Login API



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
