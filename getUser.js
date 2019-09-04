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
// call-Exercise API
server.get('/getExercise/username=:username', function(req, res, next) {

    const username =    [{ user: 
                            {
                                type: 'literal',
                                value: req.params.username
                            }
                        }];    

    var lastestEx = {};  
        
    query.execute(conn, 'scratchthai', 
    'select ?exerciseLink where { ?s a scth:Learner. ?s scth:hasLearnerPersonalInformation ?info. ?info scth:Username ?user. ?s scth:hasPractice ?practice. ?practice a scth:Practice. ?practice scth:SubmittedDate ?Date. ?lo a scth:LearningObject. 	?lo scth:isUsed ?practice. ?lo scth:hasLearningObjectType ?exercise. ?exercise a scth:Exercise. ?exercise scth:Address ?exerciseLink. } ORDER BY desc(?Date)',
    'application/sparql-results+json')
    .then( (exData) => {    // **check username first
                            const exercise = exData.body.results.bindings; 

                            for(var i=0; i<exercise.length; i++) {
                                // use the first data
                                lastestEx = exercise[0].exerciseLink;

                            }
                            res.send(lastestEx); 
                        }) 
    .catch(function(err) {
    console.log('error: ', err);
    }); 
});
// End call-Exercise API

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
