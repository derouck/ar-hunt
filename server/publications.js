Meteor.publish("onlineUsers", function() {
	return Meteor.users.find({ "status.online": true });
});
