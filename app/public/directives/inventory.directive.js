(function(angular){

	function inventoryDirective(socketService){
			
		  return{
			  restrict:'E',
			  templateUrl: '/views/inventoryDirective.html',
			  scope:{
				  player: '=',
			  },
			  
			  link: function(scope, elem, attrs) {
				  scope.launchAuction = function(produit){
					  var auction = {};
					  auction.seller = scope.player.name;
					  auction.initBid = 20; //TODO
					  auction.quantity = 1; //TODO
					  auction.item = produit;
					  socketService.emit('startAuction', auction);
					}
			  }
		  }
	}
	
	inventoryDirective.$inject = [ 'socketService'];
	
angular.module('AuctionApp')
  .directive('inventory', inventoryDirective);


})(angular);