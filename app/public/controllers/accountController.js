(function(angular){
	 
	function accueilController($scope, session, socketService){
		 $scope.user = session.getUser();
		 
		 $scope.launchAuction = function(produit){
			 alert(produit);
		 }
		 
	}
	
	accueilController.$inject = ['$scope', 'session', 'socketService'];

	  angular
	    .module('AuctionApp')
	    .controller('accountController', accueilController);
	 
})(angular);