Template.team.onCreated(function(){
	// 1. Initialization
	var instance = this;

	// 2. Autorun
	// will re-run when the "limit" reactive variables changes
	instance.autorun(function () {
		// subscribe to the posts publication
		instance.subscribe('onlineUsers');
	});
});

Template.team.helpers({
	users: function(){
		var users = Meteor.users.find().fetch();
		if(users.length === 4) {
			$('#start-game').prop("disabled",false);
		} else {
			$('#start-game').prop("disabled", true);
		}

		return users;
	},
	getGame: function(){
		console.log(Session.get('game'));
	}
});
