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
			currentAuction.time = 20;
			io.sockets.emit('startAuction', currentAuction);
			
			var count = 0;
			var timer = setInterval(function () { 
		        if(count >= currentAuction.time){
		        	io.sockets.emit('endCaution', currentAuction);
		        	currentAuction = null;
		        	clearInterval(timer);
		        }
		        else{
		        	io.sockets.emit('timeAuction', currentAuction.time - count);
		        }
		        
		        if(count == 10){
		        	currentAuction.time +=5;
		        	console.log(currentAuction.time);
		        }
		        count++;
		    }, 1000); 
			
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