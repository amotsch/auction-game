(function (angular) {

	/**
	 * Service for session
	 */
  function sessionService(){

    this.getUser = function(){
      return this._user;
    };

    this.setUser = function(user){
      this._user = user;
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