/**
 * initialisation socket.io
 */
var init = function(io){
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
}

module.exports.init = init;