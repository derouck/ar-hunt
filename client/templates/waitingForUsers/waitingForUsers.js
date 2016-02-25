Template.waitingForUsers.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('games');
		self.subscribe('usersForTeam');
	});
});

Template.waitingForUsers.helpers({
	inGameUsers: function() {
		var gameId = Session.get('currentGameId');
		var game = Games.findOne({'_id': gameId});
		var users = Meteor.users.find();
		var inGameUsers = [];

		users.forEach((user) => {
			game.players.forEach((gameUser) => {
				if(user._id === gameUser) {
					inGameUsers.push(user);
				}
			});
		});

		if(inGameUsers.length === 4) {
			$('#start-game').prop("disabled", false);
		} else {
			$('#start-game').prop("disabled", true);
		}

		return inGameUsers;
	}
});

Template.waitingForUsers.events({
	'click #start-game': function(){
		var currentGameId = Session.get('currentGameId');
		Meteor.call('setInProgress', currentGameId, function(error, response){
			if(error) {
				console.log(error.message);
			} else if(response === 1) {
				console.log('Game is started! Hurry up!');
				Router.go('/team');
			}
		});
	}
});
