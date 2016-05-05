var express = require('express');
var bodyParser = require('body-parser');

var config = require('./app/config');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var auctionModule = require('./app/modules/auction.module');
var persistModule = require('./app/modules/persist.module');

var parseUrlEncoded = bodyParser.urlencoded({extended : false});

app.use(bodyParser.json());

app.use(express.static("./app/public"));

//init of persist module
persistModule.init();

// init of auction module
auctionModule.init(io);


app.get('/', function(req,response){
	response.sendFile(__dirname + "/app/public/views/index.html");
});


app.post('/connect', parseUrlEncoded, function(request, response){
	var name = request.body.login;
	//connection.connect();
	persistModule.getUser( name, function(user) {
		//existing user
		  if(user){
			  response.json(user);
			  //connection.end();
			  response.end();
		  }
		  // new user
		  else{
			  persistModule.setUser(name, function(err, result) {
				  getUser(connection, name, function(user) {
					  response.json(user);
					  //connection.end();
					  response.end();
				  });
				  
			  });
		  }
	});
});


server.listen(config.port, function(){
	console.log("Node listen on " + config.port);
});