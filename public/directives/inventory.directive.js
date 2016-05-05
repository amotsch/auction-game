(function(angular){

	function inventoryDirective(){
			
		  return{
			  restrict:'E',
			  templateUrl: '/views/inventoryDirective.html',
			  scope:{
				  player: '=',
				  action: '&'
			  },
			  
			  link: function(scope, elem, attrs) {
				  
			  }
		  }
	}
	
angular.module('AuctionApp')
  .directive('inventory', inventoryDirective);


})(angular);