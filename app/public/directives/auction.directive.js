(function(angular){

	function cautionDirective( socketService){
			 
		  return{
			  restrict:'E',
			  templateUrl: '/views/auctionDirective.html',
			  scope:{
				  player: '='
				  
			  },
			  
			  link: function(scope, elem, attrs) {
				  scope.erreurValidation = null;
				  scope.bid = function(amount){
					  var max = scope.auction.winningBid ? scope.auction.winningBid : scope.auction.initBid;
					  
					  if(amount >max && amount <= scope.player.coins){
						  socketService.emit('bidAuction', amount);
						  scope.bid.amount = null;
					  }
					  else{
						  scope.erreurValidation = amount > scope.player.coins ? "You don't have enough coins" : "Your bid have to be more than " + max;
					  }
				  };

				  socketService.on('startAuction',function(currentAuction){
					  scope.auction = currentAuction;
					  scope.$apply();
				  });
				  
				  socketService.on('endCaution',function(currentAuction){
					  scope.erreurValidation = null;
					  scope.auction = null;
					  scope.$apply();
				  });
				  
				  socketService.on('bidAuction',function(amount){
					  scope.auction.winningBid = amount;
					  scope.$apply();
				  });
				  
				  socketService.on('timeAuction',function(timeAuction){
					  scope.auction.time = timeAuction;
					  scope.$apply();
				  });
			  }
		  }
	}
	
	cautionDirective.$inject = [ 'socketService'];
	
angular.module('AuctionApp')
  .directive('caution', cautionDirective);


})(angular);