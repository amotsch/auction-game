var assert = require('chai').assert;
var should = require('should'); 
var request = require('supertest'); 

var auctionModule = require('../modules/auction.module');
var persistModule = require('../modules/persist.module');

  describe('Auction Game Test', function() {
	  this.timeout(15000);
	
	  //current user
	  var currentUser;
	  
	  //current auction
	  var auction;
	
	  //data to update in user after auction
	  var auctionUser;
	  
	  /**
	   * Auction module  : Build \ Auction user
	   */  
	  it('Build user Auction', function(done) {
			auction = {};
			auction.winningBid = 200;
			auction.item = "diamonds";
			auction.quantity = 1;
			auction.seller = "crossover";
			auction.buyer = "google";
			
			auctionUser = auctionModule.buildUserAuction(auction, false);
			
			auctionUser.should.have.property('name', "crossover");
			done();
		});
	  
	  /**
	   * Persist module  : Insert \ Get
	   */
		it('Insert \ Get - persist module', function(done) {
			persistModule.init();
			persistModule.setUser("crossover",function(err){
				persistModule.getUser("crossover",function(user){
					user.should.have.property('name', "crossover");
					currentUser = user;
					done();
				});
			});
			
		});
	  
		/**
		* Persist module  : Update
		*/
		it('Update - persist module', function(done) {
			auctionUser.coins += currentUser.coins;
			persistModule.updateUser(auctionUser,function(err){
				persistModule.getUser(auctionUser.name,function(user){
					assert.equal(user.coins , currentUser.coins + auction.winningBid);
					done();
				});
			});
		});
	  
	  
  });


