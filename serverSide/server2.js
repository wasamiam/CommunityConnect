var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var sha1 = require('sha1');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'Secret'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4563);

//User starts with the "home" and makes get to create or login

app.get('/homePage',function(req, res, next){
	res.render('home');
});

app.post('/homePage',function(req, res, next){
 if(req.body['Logout']){
                req.session.destroy()
                console.log("session destroyed");
        }

res.render('home');
});

//User make a get request to LoginCreate from the homepage.
app.get('/LoginCreate',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  console.log("here");
  
  if(!req.session.loggedIn){
    res.render('login', context);
    return;
  }
  
  context.loggedIn = req.session.loggedIn;
  context.name = req.session.name;
  context.myLocation = req.session.myLocation;
  context.countryOfOrigin = req.session.countryOfOrigin;
  context.email = req.session.email;
  context.interests = req.session.interests;
  context.biography = req.session.biography;
  context.username = req.session.username;
  context.connections = req.session.connections;
  res.render('profile',context);
});

//Tree---> user doesnt have a profile, and the session marks them as not loggedIn --> we go to Login page
//From the "login" page, the form POSTS to /Login with the username and password fields which we search are data base for matches
app.post('/Login', function(req, res, next){
	  var context = {};
	//User enters create profile
	console.log("Inside login");
	if(req.body['Login']){
		//Scan through database looking for the netered credentials if they exits-->
		  	var testProfile = {username:"Kamron123", 
					password: sha1("secretpassword"), 
					name: "Kamron",
					myLocation: "Corvallis",
					countryOfOrigin: "United States",
					email: "testEmail@gmail.com",
					interests: "eating food",
					biography: "Hello I am Kam, I like to eat food, that all there is to me",
					numFriends: 2,
					connections:[   connection1 ={
								name:"Joe",
								interests:"driving and eating",
								biography:"Hi im Joe I like to drive my truck and eat food."	
								},
							connection2 ={
                                                        	name:"Katie",
                                                        	interests:"laughing and skipping",
                                                        	biography:"Hi im Katie I like to laugh and skip"
                                                        	} 
							]
					};
				
	//	console.log(testProfile.connections[1]);	

	 	//WE NEED TO SET THE FIELDS OF BOTH CONTEXT AND SESSSION based off the returned matching user profile object 
		  req.session.loggedIn = true; 
                  req.session.name = testProfile.name;
                  req.session.myLocation = testProfile.myLocation
                  req.session.countryOfOrigin = testProfile.countryOfOrigin;
                  req.session.email = testProfile.email;
                  req.session.interests = testProfile.interests;
                  req.session.biography = testProfile.biography;
                  req.session.username = testProfile.username; 
		  req.session.numFriends = testProfile.numFriends;
		  req.session.connections = testProfile.connections;
		
	//	console.log(req.session.connections[1]);
/*
		  context.loggedIn = req.session.loggedIn;
  		  context.name = req.session.name;
  		  context.myLocation = req.session.myLocation;
  		  context.countryOfOrigin = req.session.countryOfOrigin;
  		  context.email = req.session.email;
  		  context.interests = req.session.interests;
  		  context.biography = req.session.biography;
  		  context.username = req.session.username;
		context.numFriends =  req.session.numFriends;
		context.connections = req.session.connections;

        //        console.log(context.connections[1]);
*/
		res.render('profile', req.session); 
		return;
	}
	//if no match resend the login page
	res.render('login', req.session);
});

//The user went to login, doesnt have an account and clicks to make one
app.get('/createProfile',function(req, res, next){
	res.render('createProfile');
});

//The user enters create profile from the profile creation page
app.post('/profile',function(req, res, next){
	//Set the users fields to equal these fields
	//Need to check that we have UNIQUE PASSWORD AND USERNAME
        //Data also need to BE STORED IN DATABASE !!!!PASSWORD!!!!    
		var context ={};
		

		  if(req.body.userPassword != req.body.userRePassword || req.body.userPassword == ""){
			context.error = "you did not enter the same pasword!";
			res.render('createProfile', context);
			return;
		}

			req.session.loggedIn = true;
                  req.session.name = req.body.userNameActual;
                  req.session.myLocation = req.body.userLocation;
                  req.session.countryOfOrigin = req.body.userCOO;
                  req.session.email = req.body.userContact;
                  req.session.interests = req.body.userInterests;
                  req.session.biography = req.body.userBio;
                  req.session.username = req.body.usernameIn;
                  req.session.numFriends = 0;
                  req.session.connections = []; 
	res.render('profile', req.session);
});

//Tree --> user has either already logged in during this session or the user logged in successfully
//The user selects "search" from the rofile page
app.get('/search', function(req, res, next){
	console.log('Perform search');
	res.render('search'); 
	//Youll need to do some signalling event which lets the server know when matches have been found
}); 

//The user selects "view previous connections" from profile
app.get('/prevConnections', function(req, res, next){
	if(req.body['remove']){
		console.log("Removing a connection");
		//Make some object editing, and a database editing to REMOVE THE CONNECTION OBJECT!!!!!
		
	}
	console.log(req.session.connections[1]);
	console.log('Display previous Connections');
	res.render('friends', req.session); 
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

/*
app.post('/',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']){
    req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
    req.session.curId++;
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('toDo',context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
~     
*/
