// Start stardog
stardog-admin server start --web-console

// Add the data
stardog data add --named-graph http://www.semanticweb.org/mooc moocdb2  D:\Moocfinal2.owl

// Remove the data
stardog data remove --all final

//get User&password
select ?user ?pass where { 
    ?s a scth:Learner. 
    ?s scth:hasLearnerPersonalInformation ?info. 
    ?info scth:Username ?user. 
    ?info scth:Password ?pass. 
}