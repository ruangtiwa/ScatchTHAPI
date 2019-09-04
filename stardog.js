const { Connection, query } = require('stardog');

const JsonFind = require('json-find');
 
const conn = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});
const user1 = "ruangtiwa";
const pass1 = "1234";
var username = [{ user: 
                  {
                    type: 'literal',
                    value: user1
                  }
                }];
const password =    [{ pass: 
                      {
                          type: 'literal',
                          value: pass1
                      }
                    }];

const docUsername = JsonFind(username);
const docPassword = JsonFind(password);
// console.log(doc.findValues('value'));
var equal = false;
 
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
                        console.log(equal);
                        // console.log(allData);
                        // console.log(getUsername);
                        // console.log(getPassword);
                        // console.log(data2.body.results.bindings);
                    }) 
.catch(function(err) {
  console.log('error: ', err);
});

// console.log(comma+username+comma);