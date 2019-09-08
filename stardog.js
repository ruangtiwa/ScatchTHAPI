const { Connection, query } = require('stardog');

const Stardog = require('stardog-js');
const stardog = new Stardog({
  endpoint: 'http://localhost:5820',
  database: 'scratchthai',
  auth: {
      user: 'admin',
      pass: 'admin'
  }
});

const JsonFind = require('json-find');
 
const conn = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});
const user1 = "ruangtiwa";
const pass1 = "5678";
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

                            // if (allData[i].user.value == getUsername.value) { //check username
                            //     console.log(allData[i].user.value)
                            //     console.log('Existing username')
                            //     if (allData[i].pass.value == getPassword.value) { // check password
                            //         console.log(allData[i].pass.value)
                            //         console.log('Existing username&password')
                            //         equal = true;
                            //     }
                            // }
                            stardog.addGraph({
                              
                              from: allData[0].pass.value,
                              to: getPassword })
                            .catch(function(err) {
                              console.log('error: ', err);
                            });

                            console.log(allData[0].pass.value);
                            // console.log(obj2.value);
                        }
                      //  console.log(allData.body.results.bindings);
                        // console.log(getUsername);
                        // console.log(getPassword);
                        // console.log(data2.body.results.bindings);
                    }) 
.catch(function(err) {
  console.log('error: ', err);
});

// stardog.addGraph({
//   from: allData[0].pass.value,
//   to: getPassword
// });
// console.log(comma+username+comma);