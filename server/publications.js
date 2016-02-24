// Share all usernames
Meteor.publish('users', function() {
   return Meteor.users.find({}, {"fields": { "emails.[0].address": 1}});
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
