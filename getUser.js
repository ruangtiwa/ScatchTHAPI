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
    const findUsername = JsonFind(username);

    query.execute(conn, 'scratchthai', 
    'select ?user ?exerciseLink where { ?s a scth:Learner. ?s scth:hasLearnerPersonalInformation ?info. ?info scth:Username ?user. ?s scth:hasPractice ?practice. ?practice a scth:Practice. ?practice scth:SubmittedDate ?Date. ?lo a scth:LearningObject. 	?lo scth:isUsed ?practice. ?lo scth:hasLearningObjectType ?exercise. ?exercise a scth:Exercise. ?exercise scth:Address ?exerciseLink. } ORDER BY desc(?Date)',
    'application/sparql-results+json')
    .then( (exData) => {    // **check username first
                            const data = exData.body.results.bindings; 
                            const ownerEx = findUsername.findValues('value');

                            for(var i=0; i<data.length; i++) {
                                if (data[i].user.value == ownerEx.value) { //check username
                                        lastestEx = data[0].exerciseLink; // use the first data
                                    }                                
                            }
                            res.send(lastestEx); 
                        }) 
    .catch(function(err) {
    console.log('error: ', err);
    }); 
});
// End call-Exercise API

// Assessment API
server.get('/getAssessment/username=:username&exerciseID=:exerciseid&assesstResult=:result', function(req, res, next) {

    const username =    [{ user: 
                            {
                                type: 'literal',
                                value: req.params.username
                            }
                        }];
    
    const exercise =    [{ exID: 
                            {
                                type: 'literal',
                                value: req.params.exerciseid
                            }
                        }];
                        
    const result =    [{ resultEva: 
                        {
                            type: 'literal',
                            value: req.params.result
                        }
                    }]; 

    var assestResult = false;  // default result is false
    const getUsername = JsonFind(username);
    const getExID = JsonFind(exercise);
    const getResult = JsonFind(result);

    query.execute(conn, 'scratchthai', 
    'select ?user ?practice ?assessment ?exerciseID ?result where { ?user a scth:Learner. ?practice a scth:Practice. ?lo a scth:LearningObject. ?assessment a scth:Assessment. ?user scth:hasPractice ?practice. ?assessment scth:evaluate ?practice. ?lo scth:isUsed ?practice. ?lo scth:hasLearningObjectType ?exercise. ?lo scth:hasLearningObjectType ?exercise. ?exercise scth:ExerciseID ?exerciseID. ?assessment scth:IsPassed ?result. }',
    'application/sparql-results+json')
    .then( (evaData) => {    // **check username first
                            const assesstData = evaData.body.results.bindings;
                            // query to update result 
                            query.execute(conn, 'scratchthai', 
                            'select ?user ?exerciseLink where { ?s a scth:Learner. ?s scth:hasLearnerPersonalInformation ?info. ?info scth:Username ?user. ?s scth:hasPractice ?practice. ?practice a scth:Practice. ?practice scth:SubmittedDate ?Date. ?lo a scth:LearningObject. 	?lo scth:isUsed ?practice. ?lo scth:hasLearningObjectType ?exercise. ?exercise a scth:Exercise. ?exercise scth:Address ?exerciseLink. } ORDER BY desc(?Date)',
                            'application/sparql-results+json')
                            .then( (exData) => {    // **check username first
                                                    const data = exData.body.results.bindings; 
                                                    const ownerEx = findUsername.findValues('value');

                                                    for(var i=0; i<data.length; i++) {
                                                        if (data[i].user.value == ownerEx.value) { //check username
                                                                lastestEx = data[0].exerciseLink; // use the first data
                                                            }                                
                                                    }
                                                    res.send(lastestEx); 
                                                }) 
                            .catch(function(err) {
                            console.log('error: ', err);
                            }); 

                            // const ownerEx = findUsername.findValues('value');

                            // for(var i=0; i<data.length; i++) {
                            //     if (data[i].user.value == ownerEx.value) { //check username
                            //             lastestEx = data[0].exerciseLink; // use the first data
                            //         }                                
                            // }
                            res.send(getResult); 
                        }) 
    .catch(function(err) {
    console.log('error: ', err);
    }); 
});
// end Assessment API

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
