var persistModule = require('./persist.module');
var config = require('../config');

var currentAuction;

/**
 * initialisation socket.io
 * 
 * @param {socket.io} io - socket io server
 */
var init = function(io){
	var numberPlayer = 0;
	var auctionQueue = [];
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
			var existAuctionUser = auctionQueue.filter(function(auct){
				return auct.seller == auction.seller;
			});
			
			//user can have just one auction
			if(existAuctionUser.length == 0 && (currentAuction == null || currentAuction.seller != auction.seller)){
				auctionQueue.push(auction);
				// if no currentAuction and just one auction in queue, start auction
				if(currentAuction == null && auctionQueue.length == 1){
					startAuction(auctionQueue, io, clients);
				}
				//notify users about one pending auction
				else{
					io.sockets.emit('queueAuction', auctionQueue.length);
				}
			}
			//notify if he has already one current auction or in queue
			else{
				var message = {};
				message.success = false;
				message.messageContent = "You can not have multiple auctions";
				client.emit('messageAuction', message);
			}
		});
		
		// bid event
		client.on('bidAuction', function(amount){
			var max = currentAuction.winningBid ? currentAuction.winningBid : currentAuction.initBid;
			if(amount > max){
				//
				if(currentAuction.time - currentAuction.count <=10){
					currentAuction.time+=10;
				}
				currentAuction.winningBid = amount;
				currentAuction.buyer = client.name;
				io.sockets.emit('bidAuction', amount);
			}
		});
	});
}

/**
 * Start Auction
 * 
 * @param {array} auctionQueue - auctions in queue
 * @param {socket.io} io - socket io server
 * @param {array serveClient } clients - array serveClient
 */
var startAuction = function(auctionQueue, io, clients){
	currentAuction = auctionQueue.shift();
	currentAuction.time = config.auctionTime;
	currentAuction.count = 0;
	currentAuction.pendings = auctionQueue.length;
	io.sockets.emit('startAuction', currentAuction);
	
	var count = 0;
	var timer = setInterval(function () {
		currentAuction.count = count;
        if(count >= currentAuction.time){
        	io.sockets.emit('endAuction', currentAuction);
        	clearInterval(timer);
        	if(currentAuction.winningBid){
        		updateAfterAuction(clients,currentAuction);
        	}
        	currentAuction = null;
        	if(auctionQueue.length > 0){
        		startAuction(auctionQueue, io, clients);
        	}
        }
        else{
        	io.sockets.emit('timeAuction', currentAuction.time - count);
        }
        count++;
    }, 1000); 
}

/**
 * Update when auction is finished
 * 
 * @param {array serveClient } clientSockets - array serveClient
 * @param {object} auction - finish auction 
 */
var updateAfterAuction = function(clientSockets, auction){
	var seller = buildUserAuction(auction, false);
	updateUserAuction(clientSockets[seller.name], seller);
	
	var buyer = buildUserAuction(auction, true);
	updateUserAuction(clientSockets[buyer.name], buyer);
}

/**
 * Update user after auction
 * 
 * @param { serveClient } clientSocket - serveClient
 * @param {Object} userAuction - data to update in user avec auction 
 */
var updateUserAuction = function(clientSocket, userAuction){
	persistModule.getUser( userAuction.name, function(user) {
		userAuction.coins += user.coins;
		userAuction.quantity += user[userAuction.item];
		persistModule.updateUser( userAuction, function(err){
			if(!err){
				clientSocket.emit('resultAuction', userAuction);
			}
		});
	});
}

/**
 * Create auction
 * 
 * @param { object } auction - finish auction
 * @param {boolean} buy - true for buyer, false for seller
 * 
 */
var buildUserAuction = function(auction, buy){
	var auctionUser = {};
	auctionUser.name = buy ? auction.buyer : auction.seller;
	auctionUser.coins = buy ? (- auction.winningBid) : auction.winningBid;
	auctionUser.item = auction.item;
	auctionUser.quantity = buy ?  auction.quantity : (- auction.quantity);
	auctionUser.initialQuantity = auctionUser.quantity;
	auctionUser.winningBid = auction.winningBid;
	return auctionUser;
}

module.exports.init = init;
module.exports.buildUserAuction = buildUserAuction;