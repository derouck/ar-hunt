Template.currentBomb.onCreated(function(){

    bomb = Beacons.findOne();
    instance = Template.instance();
    instance.beaconsFound = new ReactiveVar( false );

    if (Meteor.isCordova) {

      region = new ReactiveBeaconRegion({identifier: bomb.name, uuid: bomb.uuid});

      self = this;
      Tracker.autorun(function () {

        if (region.getBeaconRegion().beacons.length) {
            let beacons = region.getBeaconRegion().beacons;
            console.log(beacons);
            //Template.instance().beaconsFound.set();
            _.each(beacons, function(element){
                console.log(element.uuid, element.minor, element.major);
                if(element.minor == bomb.minor && element.major == bomb.major){
                  instance.beaconsFound.set(element.proximity);
                  console.log("beacon in region "+bomb.minor+" "+bomb.major);
                }
            });

        }
      });
    }

});

Template.currentBomb.helpers({
   currentBomb() {
      console.log(Beacons.findOne());
      return Beacons.findOne();
   },
   proximity: function(){
    return Template.instance().beaconsFound.get();
    //return Session.get('subBeaconList');
  },
  proximity3: function(){
   return (Template.instance().beaconsFound.get() =='ProximityImmediate');
   //return Session.get('subBeaconList');
  },
  proximity2: function(){
   return (Template.instance().beaconsFound.get() =='ProximityNear');
   //return Session.get('subBeaconList');
  },
  proximity1: function(){
   return (Template.instance().beaconsFound.get() =='ProximityFar');
   //return Session.get('subBeaconList');
  },
  proximity0: function(){
   return (Template.instance().beaconsFound.get() =='ProximityUnknown');
   //return Session.get('subBeaconList');
  }
});

Template.currentBomb.events({
  'click #cutWire': function() {
    alert("CUT");
    let bomb = Beacons.findOne();
    Meteor.call('cutWire', bomb._id, function(err, result){

      console.log(result);
    })
  }
});
