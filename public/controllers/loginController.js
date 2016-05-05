(function(angular){
	 
	function loginController( $scope, $location, auth){
		$scope.login = function(){
			  auth.login($scope.user).then(function(resp) {
				  $location.path('my-account');
			  })
			  .catch(function(fallback) {
				  // should never happen
				  $scope.erreurLogin = "Authentification problem";
			  });
		  };
	}
	
	loginController.$inject = ['$scope', '$location', 'auth'];

	angular
	  .module('AuctionApp')
	  .controller('loginController', loginController);
	 
})(angular);