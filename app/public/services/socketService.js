(function(angular){

	/**
	 * Service for sockets
	 */
	function socketService(session){
		var socket;
		
		return {
			init: function(bool){                    
				if(bool){          
					if(!socket ) {   
			            socket = io.connect();
			        } else {
			            socket.connect(); 
			        }
			    }else{
			    	socket.emit('disconnect');
			        socket.disconnect();
			    }
			}, 
			
		    on: function(eventName, callback){
		      socket.on(eventName, callback);
		    },
		    emit: function(eventName, data) {
		      socket.emit(eventName, data);
		    }
		}
	}

	socketService.$inject = ['session'];

	angular
	    .module('AuctionApp')
	    .service('socketService', socketService);
	
})(angular);