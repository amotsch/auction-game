(function(angular){

	function cautionDirective( socketService){
			 
		  return{
			  restrict:'E',
			  templateUrl: '/views/auctionDirective.html',
			  scope:{
				  player: '=',
				  inform: '&'
			  },
			  
			  link: function(scope, elem, attrs) {
				  scope.errorValidation = null;
				  scope.bid = function(amount){
					  var max = scope.auction.winningBid ? scope.auction.winningBid : scope.auction.initBid;
					  
					  if(amount >max && amount <= scope.player.coins){
						  socketService.emit('bidAuction', amount);
						  scope.bid.amount = null;
					  }
					  else{
						  scope.errorValidation = amount > scope.player.coins ? "You don't have enough coins" : "Your bid have to be more than " + max;
					  }
				  };

				  socketService.on('startAuction',function(currentAuction){
					  scope.auction = currentAuction;
					  scope.$apply();
				  });
				  
				  socketService.on('endAuction',function(currentAuction){
					  scope.errorValidation = null;
					  scope.auction = null;
					  scope.$apply();
				  });
				  
				  socketService.on('bidAuction',function(amount){
					  scope.errorValidation = null;
					  scope.auction.winningBid = amount;
					  scope.$apply();
				  });
				  
				  socketService.on('timeAuction',function(timeAuction){
					  scope.auction.time = timeAuction;
					  scope.$apply();
				  });
				  
				  socketService.on('queueAuction',function(pendingsCaution){
					  scope.auction.pendings = pendingsCaution;
					  scope.$apply();
				  });
				  
				  socketService.on('resultAuction',function(resultAuction){
					  scope.player.coins = resultAuction.coins;
					  scope.player[resultAuction.item] = resultAuction.quantity;
					  var message = {};
					  var messageContent = "You just " + (resultAuction.initialQuantity > 0 ? "buy " : "sell ");
					  messageContent += Math.abs(resultAuction.initialQuantity) + " " + resultAuction.item + "(s)";
					  messageContent += " for " + resultAuction.winningBid + " coins";
					  message.success = true;
					  
					  message.messageContent = messageContent;
					  scope.inform({message:message});
					  scope.$apply();
				  });
				  
				  socketService.on('messageAuction',function(messageCaution){
					  scope.inform({message:messageCaution});
					  scope.$apply();
				  });
			  }
		  }
	}
	
	cautionDirective.$inject = [ 'socketService'];
	
angular.module('AuctionApp')
  .directive('caution', cautionDirective);


})(angular);