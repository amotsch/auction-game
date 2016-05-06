(function(angular){

	function loginService($http, session, socketService, $location, $rootScope){
		
		this.isLoggedIn = function(){
			return session.getUser() != null;
		};
			
		this.login = function(user){
			var service = this; 
			return $http({method: 'POST', url: '/connect/', 
				data: {login: user.name}})
				.then(function(response) {
					session.setUser(response.data);
					socketService.init(true);
					socketService.emit("join", session.getUser().name);
					socketService.on('connect', function(){console.log('connected')});                                 

					socketService.on('disconnectUser', function (player){
						if(player === session.getUser().name){
							console.log('disconnected');
							service.logout();
			            }
					});
				});
		};
		
		this.logout = function(){
			socketService.init(false);
			session.destroy();
			$location.path('/');
		}
	}

	loginService.$inject = ['$http', 'session', 'socketService', '$location', '$rootScope'];

	angular
	    .module('AuctionApp')
	    .service('auth', loginService);
	
})(angular);