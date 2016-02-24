Meteor.startup(function () {

  if (Games.find({status:"active"}).count() === 0) {
    Games.insert(
        {
          teamName:"Team 1",
          status:"active",
          players:[],
          createdAt: new Date()
        }
    );
  }
  if (Beacons.find().count() === 0) {

    Beacons.insert(
        {
          name:"Beacon 1"
        }
    );
    Beacons.insert(
        {
          name:"Beacon 2"
        }
    );
    Beacons.insert(
        {
          name:"Beacon 3"
        }
    );
    Beacons.insert(
        {
          name:"Beacon 4"
        }
    );
  }

});
