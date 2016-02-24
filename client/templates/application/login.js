var UUID = "d0d3fa86-ca76-45ec-9bd9-6af490c204d4";

Template.login.events({
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },
    'click #checkBeacons': function(event) {
        console.log("Test ibeacons with button");

        var reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "beacons on shelf", uuid: UUID});

        var beaconRegion = reactiveBeaconRegion.getBeaconRegion();

        console.log(beaconRegion);
    }
});

Meteor.startup(function () {
    // The correct way
    console.log("Meteor startup");
    var reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "beacons on shelf", uuid: UUID});

    var beaconRegion = reactiveBeaconRegion.getBeaconRegion();

    console.log(beaconRegion);
});
