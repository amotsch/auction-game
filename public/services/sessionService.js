(function (angular) {

  function sessionService(){
//	var localStorage = $window.localStorage;
//	
//	try{
//		this._user = JSON.parse(localStorage.getItem('session.user'));
//	}
//	catch (e) {
//		this._user = null;
//	}

    this.getUser = function(){
      return this._user;
    };

    this.setUser = function(user){
      this._user = user;
//      localStorage.setItem('session.user', JSON.stringify(user));
      return this;
    };

    /**
     * Destroy session
     */
    this.destroy = function destroy(){
      this.setUser(null);
    };

  }

  sessionService.$inject = [];

  angular
    .module('AuctionApp')
    .service('session', sessionService);

})(angular);