Meteor.publish("onlineUsers", function() {
	return Meteor.users.find({"status.online": true});
});

Meteor.publish('beacons', function() {
   return Beacons.find();
});

Meteor.publish('games', function() {
   return Games.find();
});
