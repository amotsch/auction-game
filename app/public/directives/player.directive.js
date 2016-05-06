(function(angular){

	/**
	 * Directive for Player
	 */
	function playerDirective( ){

		  return{
			  restrict:'E',
			  templateUrl: '/views/playerDirective.html',
			  scope:{
				  name: '@',
				  coins:'@',
				  logout:'&'
			  },
			  
			  link: function(scope, elem, attrs) {

			  }
		  }
	}
	
angular.module('AuctionApp')
  .directive('player', playerDirective);


})(angular);