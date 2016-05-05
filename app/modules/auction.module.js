var persistModule = require('./persist.module');

/**
 * initialisation socket.io
 */
var init = function(io){
	var numberPlayer = 0;
	var currentAuction;
	io.on('connection', function(client){
		
		// when user join the auction
		client.on('join', function(player){
			client.name = player;
			numberPlayer++;
			console.log(player + " join auction..., number of player " + numberPlayer);
			
			//if current auction != null
			if(currentAuction!= null){
				console.log("send current auction to :" + client.name);
				client.emit('startAuction',currentAuction );
			}
			
			//if user is already connected will be logged out
			client.broadcast.emit('disconnectUser', client.name);
			
		});
		
		//deconnection
		client.on('disconnect', function(){
			numberPlayer--;
			console.log(client.name +  " leave auction..., number of player " + numberPlayer);
		});
		
		//start auction event
		client.on('startAuction', function(auction){
			currentAuction = auction;
			console.log(auction);
			io.sockets.emit('startAuction', currentAuction);
			

			//client needs to be aware when game is ended
			//but if we have simultaneous games this will not work
			setTimeout(function(){
				io.sockets.emit('endCaution', currentAuction);

			}, 8000); //after 8 seconds for test
			
		});
		
		// bid event
		client.on('bid', function(amount){
			currentAuction.winningBid = amount;
			console.log("bid= " + amount);
			io.sockets.emit('startAuction', currentAuction);
		});
		
		
	});
}

module.exports.init = init;