(function(angular){
	 
	 /**
	 * Controller for Account
	 * 
	 * @param {$scope} $scope: controller scope
	 * @param {sessionService} session: session client
	 * @param {socketService} socketService: client socket service
	 * @param {$timeout} $timeout: timeout angular
	 */
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