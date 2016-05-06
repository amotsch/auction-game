(function(angular){
	 
	function accueilController($scope, session, socketService, $timeout){
		 $scope.user = session.getUser();
		 
		 $scope.inform = function(message){
			 $scope.messageInfo = message;
			 $timeout(function(){
				 $scope.messageInfo = null;
		      }, 10000);
		 }
	}
	
	accueilController.$inject = ['$scope', 'session', 'socketService', '$timeout'];

	  angular
	    .module('AuctionApp')
	    .controller('accountController', accueilController);
	 
})(angular);