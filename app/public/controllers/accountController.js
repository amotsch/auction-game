(function(angular){
	 
	function accueilController($scope, session, socketService){
		 $scope.user = session.getUser();
		 
	}
	
	accueilController.$inject = ['$scope', 'session', 'socketService'];

	  angular
	    .module('AuctionApp')
	    .controller('accountController', accueilController);
	 
})(angular);