var persistModule = require('./persist.module');

/**
 * initialisation socket.io
 */
var init = function(io){
	var numberPlayer = 0;
	var currentAuction;
	var clients = [];
	io.on('connection', function(client){
		
		// when user join the auction
		client.on('join', function(player){
			client.name = player;
			clients[client.name] = client;
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
		        	clearInterval(timer);
		        	this.updateAfterCaution(clients,currentAuction);
		        	currentAuction = null;
		        }
		        else{
		        	io.sockets.emit('timeAuction', currentAuction.time - count);
		        }
		        count++;
		    }, 1000); 
			
		});
		
		// bid event
		client.on('bidAuction', function(amount){
			var max = currentAuction.winningBid ? currentAuction.winningBid : currentAuction.initBid;
			if(amount > max){
				currentAuction.winningBid = amount;
				currentAuction.buyer = client.name;
				console.log("bid= " + amount);
				io.sockets.emit('bidAuction', amount);
			}
		});
	});
}

var updateAfterCaution = function(clients, auction){
	//TODO
	var seller = {};
	seller.name = auction.seller;
	seller.coins = auction.winningBid;
	seller.item = auction.item;
	
	var buyer = {};
	seller.name = auction.buyer;
	seller.coins = auction.winningBid;
	seller.item = auction.item;
	
}

module.exports.init = init;