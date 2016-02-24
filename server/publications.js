Meteor.publish("users", function() {
	return Meteor.users.find({});
});

Meteor.publish('beacons', function() {
   return Beacons.find();
});

Meteor.publish('games', function() {
   return Games.find();
});

Meteor.publish('currentGame', function() {
  return Games.find({status: "inProgress", players: {$in: [this.userId]}});
});

Meteor.publish('readyGames', function(){
	return Games.find({status: "ready"});
});
