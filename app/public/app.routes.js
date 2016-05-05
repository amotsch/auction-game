(function(){
	 'use strict';
	 
	angular.module('AuctionApp')
	  .config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '/views/loginView.html',
					controller: 'loginController',
					controllerAs: 'loginController'
				})
				.when('/my-account', {
					templateUrl: '/views/myAccountView.html',
					controller: 'accountController',
					controllerAs: 'accountController'
				})
				.otherwise({ redirectTo: '/'});
	  });
})();