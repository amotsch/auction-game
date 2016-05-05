var mysql = require('mysql');
var config = require('../config');

var connection;


/**
 * initialisation connection
 */
var init = function(){
	connection = mysql.createConnection({
		   host     : config.database.url,
		   user     : config.database.user,
		   password : config.database.password,
		   database : config.database.schema
	});
	
}

/**
 * get user
 */
var getUser = function( name, callback){
	connection.query('SELECT * FROM user WHERE name = ?', name, function(err, rows, fields){
		if (err) throw err;
		var user = null;
		if(rows.length > 0){
			 user = rows[0];
		 }
		callback(user);
	});
}

/**
 * set user
 */
var setUser = function( name, callback){
	connection.query('INSERT INTO user SET name = ?', name, function(err, result) {
		if (err) throw err;
		callback(err, result);
	});
}

module.exports.init = init;
module.exports.getUser = getUser;
module.exports.setUser = setUser;
