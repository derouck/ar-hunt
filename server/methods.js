Meteor.methods({
	joinGame: function(id) {
		return Games.update(id, {$push: {players: this.userId}});
	}
});
