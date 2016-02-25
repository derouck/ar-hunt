Template.currentBomb.onCreated(function(){
   console.log("currentbomb created");
});

Template.currentBomb.helpers({
   currentBomb() {
      console.log(Beacons.findOne());
      return Beacons.findOne();
   }
});