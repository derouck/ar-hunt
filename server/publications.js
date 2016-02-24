Meteor.publish("onlineUsers", function() {
	return Meteor.users.find({"status.online": true});
});

Meteor.publish('beacons', function() {
   return Beacons.find();
});

Meteor.publish('games', function() {
   return Games.find();
});

Meteor.publish('currentGame', function() {
  return Games.find({status:"inProgress",players:{$in:[this.userId]}});
});
