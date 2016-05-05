(function(){
	 'use strict';
		
	angular.module('AuctionApp', ['ngRoute'])
	.run(['$rootScope', '$location', 'auth', 'session',
	      function ($rootScope, $location, auth, session, $http) {
				$rootScope.session = session;
				$rootScope.auth = auth;
				
				if(!auth.isLoggedIn()){
					$location.path('/');
				}

		        $rootScope.$on('$locationChangeStart', function (event, next, current) {
		        	if ( ($location.path() !== '/' ) && (!auth.isLoggedIn()) ) {
		                $location.path('/');
		                event.preventDefault();
		            }
		        	
		        	if ( $location.path() === '/' &&  auth.isLoggedIn() ){
		        		$location.path('my-account');
		                event.preventDefault();
		        	}
		        	
		        });
	}]);
})();