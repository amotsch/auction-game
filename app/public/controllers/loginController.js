(function(angular){
	 
	 /**
	 * Controller for Login
	 */
	function loginController( $scope, $location, auth, $uibModal){
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
	
	loginController.$inject = ['$scope', '$location', 'auth', '$uibModal'];

	angular
	  .module('AuctionApp')
	  .controller('loginController', loginController);
	 
})(angular);