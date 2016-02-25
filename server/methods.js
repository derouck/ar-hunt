Meteor.methods({
	joinGame: function(id) {
		return Games.update(id, {$push: {players: this.userId}});
	},
	setInProgress: function(id) {
		return Games.update(id, {$set: {status: 'inProgress'}});
	}
});
