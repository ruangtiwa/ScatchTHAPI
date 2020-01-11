// Start stardog
stardog-admin server start --web-console

// Add the data
stardog data add --named-graph http://www.semanticweb.org/scratchthai scratchthai  D:\Moocfinal2.owl

// Remove the data
stardog data remove --all final

//get User&password
select ?user ?pass where { 
    ?s a scth:Learner. 
    ?s scth:hasLearnerPersonalInformation ?info. 
    ?info scth:Username ?user. 
    ?info scth:Password ?pass. 
}

//get Exercise
select ?user ?pass ?practice ?exercise ?exerciseLink where 
{ 	
  #get user information
  	?s a scth:Learner. 
 	?s scth:hasLearnerPersonalInformation ?info. 
  	?info scth:Username ?user. 
  	  
  #get practice of user
  	?s scth:hasPractice ?practice.
  	?practice a scth:Practice.
  	?practice scth:SubmittedDate ?Date.
  
  #get lo
  	?lo a scth:LearningObject.
  	?lo scth:isUsed ?practice.
  	?lo scth:hasLearningObjectType ?exercise.
  	?exercise a scth:Exercise.
  	?exercise scth:Address ?exerciseLink. 	 
} ORDER BY desc(?Date)

//get assessment result
select ?user ?practice ?assessment ?exerciseID ?result where 
{ 	
  #declare 
  	?user a scth:Learner.
  	?practice a scth:Practice.
  	?lo a scth:LearningObject.
  	?assessment a scth:Assessment.
   	  
  #get practice of user
  	?user scth:hasPractice ?practice. 
  	?assessment scth:evaluate ?practice.
  
  #get lo  	
  	?lo scth:isUsed ?practice.
  	?lo scth:hasLearningObjectType ?exercise.
  	?lo scth:hasLearningObjectType ?exercise.
  	?exercise scth:ExerciseID ?exerciseID.
  
  #get assessment result
  	?assessment scth:IsPassed ?result.  	  
} 

