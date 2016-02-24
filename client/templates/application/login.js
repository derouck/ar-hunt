Template.login.onCreated(function () {
	var instance = this;
	instance.autorun(function () {
		instance.subscribe('games');
	});
});

Template.login.helpers({
	games: function () {
		return Games.find({status: 'ready'});
	}
});

Template.login.events({
	'click #logout': function (event) {
		Meteor.logout(function (err) {
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		})
	},
	'click .join-game': function (event) {
		Meteor.call('joinGame', this._id, function(error, response) {
			if(error) {
				console.log(error.message);
			} else if(response === 1) {
				Session.set('game', this);
				console.log('You have joined the game');
				Router.go('/team');
			}
		});
	}
});
