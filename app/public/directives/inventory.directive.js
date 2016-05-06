(function(angular){

	/**
	 * Directive for Inventory
	 */
	function inventoryDirective(socketService, $uibModal){
			
		return{
			  restrict:'E',
			  templateUrl: '/views/inventoryDirective.html',
			  scope:{
				  player: '=',
			  },
			  
			  link: function(scope, elem, attrs) {
				  scope.startAuction = function (produit) {
					  scope.auction = {};
					  scope.auction.item = produit;
					  scope.auction.quantity = 1;
					  var modalInstance = $uibModal.open({
						  templateUrl: '/views/auction.html',
					      controller: function($scope, auction, player) {
					    	  $scope.auction = auction;
					    	  $scope.auction.seller = player.name;
					    	  $scope.cancel = function () {
					    		  modalInstance.dismiss('cancel');
					    	  }
					    	  
					    	  $scope.ok = function () {
					    		  if(!$scope.auction.initBid || $scope.auction.initBid <= 0){
					    			  $scope.validationError = "Minimu bid must be > 0";
					    		  }
					    		  else if(!$scope.auction.quantity || $scope.auction.quantity <= 0){
					    			  $scope.validationError = "Minimu bid must be > 0";
					    		  }
					    		  else if($scope.auction.quantity > player[$scope.auction.item]){
					    			  $scope.validationError = "You don't have enough " + $scope.auction.item;
					    		  }
					    		  else{
					    			  modalInstance.close($scope.auction);
					    		  }
					    	  }
					      },
					      resolve: {
					    	  auction: function () {
					    		  return scope.auction;
					    	  },
					    	  player: function () {
					    		  return scope.player;
					    	  }
					      },
					      size: 600

					    });

					    modalInstance.result.then(function (auction) {
							socketService.emit('startAuction', auction);
					    });
					  };
				  
			}
		}
	}
	
	inventoryDirective.$inject = [ 'socketService' ,'$uibModal'];
	
	angular.module('AuctionApp')
	  .directive('inventory', inventoryDirective);


})(angular);