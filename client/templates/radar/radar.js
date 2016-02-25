Template.radar.onCreated(function () {
    console.log("radar on created");

    if (Meteor.isCordova) {


      reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "blue", uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d"});
      beaconRegion = reactiveBeaconRegion.getBeaconRegion();

      reactiveBeaconRegion2 = new ReactiveBeaconRegion({identifier: "shoe", uuid: "d0d3fa86-ca76-45ec-9bd9-6af490c204d4"});
      beaconRegion2 = reactiveBeaconRegion2.getBeaconRegion();


      Tracker.autorun(function () {
          if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
              Session.set('beacon', beaconRegion.identifier);
              Session.set('beaconCount', beaconRegion.beacons.length);
          }
          if (reactiveBeaconRegion2.getBeaconRegion().inRegion) {
              //shoe
              Session.set('beacon2', beaconRegion2.identifier);
              Session.set('beaconCount2', beaconRegion2.beacons.length);

              _.each(beaconRegion2.beacons, function(e){
                if(e.major == "8745" && e.minor == "24729"){
                  Session.set('beacon2', beaconRegion2.identifier+"_"+e.minor+"_"+e.major);
                  Session.set('beaconCount2', beaconRegion2.beacons.length);
                  
                }

              });

          }
      });
    }
    else {
      beaconRegion = false;
    }
});

Template.radar.helpers({
    counter: function () {
      return Session.get('counter');
    },
    beacon: function() {
      return Session.get("beacon");
    },
    beaconCount: function() {
      return Session.get("beaconCount");
    },
    beacon2: function() {
      return Session.get("beacon2");
    },
    beaconCount2: function() {
      return Session.get("beaconCount2");
    }
});
