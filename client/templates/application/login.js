Template.login.events({

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});
Template.login.onCreated(function () {
  this.subscribe('games');
});
