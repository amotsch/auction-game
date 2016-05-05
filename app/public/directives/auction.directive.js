(function(angular){

	function cautionDirective( socketService){
			 
		  return{
			  restrict:'E',
			  templateUrl: '/views/auctionDirective.html',
			  scope:{
				  player: '='
				  
			  },
			  
			  link: function(scope, elem, attrs) {
				  scope.bid = function(amount){
					  socketService.emit('bid', amount);
				  };

				  socketService.on('startAuction',function(currentAuction){
					  scope.auction = currentAuction;
					  scope.$apply();
				  });
				  
			  }
		  }
	}
	
	cautionDirective.$inject = [ 'socketService'];
	
angular.module('AuctionApp')
  .directive('caution', cautionDirective);


})(angular);