var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var parseUrlEncoded = bodyParser.urlencoded({extended : false});

app.use(bodyParser.json());

app.use(express.static("public"));

//TODO : fichier config
var connection = mysql.createConnection({
	   host     : 'localhost',
	   user     : 'crossover',
	   password : 'crossover',
	   database : 'crossover'
});

var numberPlayer = 0;

io.on('connection', function(client){
	
	// when user join the auction
	client.on('join', function(player){
		numberPlayer++;
		console.log(player + " join auction..., number of player " + numberPlayer);
		
		//if user is already connected will be logged out
		client.broadcast.emit('disconnectUser', player);
		
	});
	
	client.on('disconnect', function(player){
		numberPlayer--;
		console.log(player +  " leave auction..., number of player " + numberPlayer);
	});
	
	
});




app.get('/', function(req,response){
	response.sendFile(__dirname + "/public/views/index.html");
});


app.post('/connect', parseUrlEncoded, function(request, response){
	var name = request.body.login;
	//connection.connect();
	getUser(connection, name, function(err, rows, fields) {
		//existing user
		  if(rows.length > 0){
			  response.json(rows[0]);
			  //connection.end();
			  response.end();
		  }
		  // new user
		  else{
			  connection.query('INSERT INTO user SET name = ?', name, function(err, result) {
				  if (err) throw err;
				  getUser(connection, name, function(err, rows, fields) {
					  response.json(rows[0]);
					  //connection.end();
					  response.end();
				  });
				  
			  });
		  }
	});
});


function getUser(connection, name, callback){
	connection.query('SELECT * FROM user WHERE name = ?', name, function(err, rows, fields){
		if (err) throw err;
		callback(err, rows, fields);
	});
}

server.listen(80, function(){
	console.log("Node listen on " + 80);
});