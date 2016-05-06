var assert = require('chai').assert;
var should = require('should'); 
var request = require('supertest'); 

var config = require('../config');
var auctionModule = require('../modules/auction.module');
var persistModule = require('../modules/persist.module');

  describe('Auction Game Test', function() {
	  this.timeout(15000);
	
	  /**
	   * Persist module
	   */
		it('Update \ Get - persist module', function(done) {
			persistModule.init();
//			connection.should.have.property('user', "crossover");
			persistModule.updateUser('crossover',function(err){
				console.log(err);
				persistModule.getUser('crossover',function(user){
					assert.equal('bar', 'bar');
					user.should.have.property('name', "adrien");
					done();
				});
				
				

				
			});
			
		});
	  
	  
	  
	  
	  
	it('Connexion to server', function(done) {
	      var profile = {
	        login :"crossover",
	      };
	    request('http://localhost/')
		.post('connect')
		.send(profile)
		.end(function(err, res) {
	          if (err) {
	            throw err;
	          }
//	          console.log(res);
	          res.should.have.property('status', 200);
			  done();
	        });
	    });
	
	
	it('bidon', function(done) {
		var test = {};
		test.status = 200;
		test.should.have.property('status', 200);
		done();
	});
	
	
	it('Build user Auction', function(done) {
		var auction = {};
		auction.status = 200;
		auction.item = "bread";
		auction.quantity = 200;
		auction.seller = "adrien";
		auction.buyer = "google";
		
		var auctionUser = auctionModule.buildUserAuction(auction, true);
		
		auctionUser.should.have.property('name', "google");
		done();
	});
	
//	it('Connexion to server get', function(done) {
//
//	    request('http://localhost/')
//		.get('')
//		.send()
//		.end(function(err, res) {
//	          if (err) {
//	            throw err;
//	          }
//	          res.should.have.property('status', 200);
//			  done();
//	        });
//	    });
	
	
//	it('Connexion au portail famille avec le user ZVM488', function(done) {
//      var profile = {
//        loginfamille :"ZVM488",
//        langue :"fr",
//        passfamille :"1140"
//      };
//    request('https://api.icap.fr/serveurs/portailfamille/')
//	.post('connexion/')
//	.send(profile)
//    // end handles the response
//	.end(function(err, res) {
//          if (err) {
//            throw err;
//          }
//          // this is should.js syntax, very clear
//          res.should.have.property('status', 200);
//		  res.body.jetonapi.should.not.equal(null);
//		  jetonapi = res.body.jetonapi;
//		  done();
//        });
//    });
//	
//	it('Récupération des enfants', function(done) {
//    request('https://api.icap.fr/serveurs/portailfamille/')
//	.get('enfant/')
//	.set('Authorization', jetonapi)
//    // end handles the response
//	.end(function(err, res) {
//          if (err) {
//            throw err;
//          }
//          // this is should.js syntax, very clear
//        res.should.have.property('status', 200);
//		done();
//        });
//    });
//	
//	it('Déconnexion pour être certain', function(done) {
//    request('https://api.icap.fr/serveurs/portailfamille/')
//	.get('deconnexion/')
//	.set('Authorization', jetonapi)
//    // end handles the response
//	.end(function(err, res) {
//          if (err) {
//            throw err;
//          }
//          // this is should.js syntax, very clear
//          res.should.have.property('status', 401);
//		  done();
//        });
//    });
//	
// 	it('Erreur 401 comme pas connecté', function(done) {
//    request('https://api.icap.fr/serveurs/portailfamille/')
//	.get('enfant/')
//	.set('Authorization', jetonapi)
//    // end handles the response
//	.end(function(err, res) {
//          if (err) {
//            throw err;
//          }
//          // this is should.js syntax, very clear
//          res.should.have.property('status', 401);
//		  //res.body.jetonapi.should.not.equal(null);
//		  jetonapi = res.body.jetonapi;
//		  done();
//        });
//    }); 
	  
    
  });


