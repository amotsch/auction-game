(function(angular){

	function casePlanningDirective( $filter, PLANNING){
		
		 function getClassWithEtat(etat) {
			 switch(etat) {
			    case PLANNING.etat.NON_DISPONIBLE.id:
			    	return PLANNING.etat.NON_DISPONIBLE.css;
			    case PLANNING.etat.COMPLET.id:
			    	return PLANNING.etat.COMPLET.css;
			    case PLANNING.etat.RESERVE.id:
			    	return PLANNING.etat.RESERVE.css;
			    case PLANNING.etat.DEMANDE.id:
			    	return PLANNING.etat.DEMANDE.css;
			    case PLANNING.etat.REFUSE.id:
			    	return PLANNING.etat.REFUSE.css;
			    case PLANNING.etat.ANNULE.id:
			    	return PLANNING.etat.ANNULE.css;
			    default:
			    	return '';
			}
		 };
		 
		 function buildReservation(date, prestation, etat){
			 var reservationNouvelle = new Object();
			 reservationNouvelle.jour = date;
			 reservationNouvelle.presta = prestation;
			 reservationNouvelle.etat = etat;
			 return reservationNouvelle;
		 }
		
		  return{
			  restrict:'E',
			  scope:{
				  reservations: '=',
				  reservationsNouvelle: '=',
				  date: '@',
				  prestation: '=',
				  calculePrix: '&',
				  readonly: '=',
				  prixEstime: '='
			  },
			  
			  link: function(scope, elem, attrs) {
				 scope.reservation = null;
				 scope.reservationModifie = null;
				 
				 var reservationsTrouve = $filter('filter')(scope.reservations, {jour: scope.date , presta: scope.prestation}, true);
				 if (reservationsTrouve.length) {
					 scope.reservation = reservationsTrouve[0];
					 elem.addClass(getClassWithEtat(scope.reservation.etat));
					 if(scope.reservation.etat != PLANNING.etat.DEMANDE.id){
						 elem.css('cursor', "not-allowed");
					 }
			     }
				 
				 if(scope.readonly){
					 elem.addClass("no-pointer");
				 }
				  
				  elem.bind('click', function() {
					  if(!scope.readonly){
						  if(scope.reservationNouvelle !=null){
							  if(scope.reservationNouvelle.etat == PLANNING.etat.DEMANDE.id){
								  if(scope.reservation != null){
									  elem.addClass(PLANNING.etat.ANNULE.css);
								  }
								  elem.removeClass(PLANNING.etat.DEMANDE.css);
							  }
							  else{
								  elem.addClass(PLANNING.etat.DEMANDE.css);
								  elem.removeClass(PLANNING.etat.ANNULE.css);
							  }
							  var index = scope.reservationsNouvelle.indexOf(scope.reservationNouvelle);
							  scope.reservationsNouvelle.splice(index, 1);
							  
							  scope.reservationNouvelle =null;
						  }
						  else if(scope.reservation == null){
							  scope.reservationNouvelle = buildReservation(scope.date, scope.prestation, PLANNING.etat.DEMANDE.id);
							  elem.addClass(PLANNING.etat.DEMANDE.css);
							  scope.reservationsNouvelle.push(scope.reservationNouvelle);
						  }
						  else if(scope.reservation.etat == PLANNING.etat.DEMANDE.id){
							  scope.reservationNouvelle = buildReservation(scope.date, scope.prestation, PLANNING.etat.ANNULE.id);
							  elem.removeClass(PLANNING.etat.DEMANDE.css);
							  elem.addClass(PLANNING.etat.ANNULE.css);
							  scope.reservationsNouvelle.push(scope.reservationNouvelle);
						  }
						  
						  var prix = scope.calculePrix({reservations: scope.reservationsNouvelle});
						  scope.prixEstime.prix = prix;
						  scope.$apply();
					  }
				  });
			  }
		  }
	}
	
	casePlanningDirective.$inject = [ '$filter', 'PLANNING'];
	
angular.module('PrestationsApp')
  .directive('casePlanning', casePlanningDirective);


})(angular);