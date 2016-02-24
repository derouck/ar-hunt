// Share all usernames
// Meteor.publish(null, function() {
//    return Meteor.users.find({}, {"fields": { "username": 1}});
// });
Meteor.publish('beacons', function() {
   return Beacons.find();
});
Meteor.publish('games', function() {
   return Games.find();
});

Meteor.publish('currentGame', function() {
  return Games.find({status:"inProgress",players:{$in:[this.userId]}});
});
