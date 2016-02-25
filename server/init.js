Meteor.startup(function () {

  if (Games.find({status:"ready"}).count() === 0) {
    Games.insert(
        {
          teamName:"Team 1",
          status:"ready",
          players:[],
          createdAt: new Date()
        }
    );
  }
  if (Beacons.find().count() === 0) {

    Beacons.insert(
        {
          name:"Bomb 1",
          image:"bomb1.jpg",
          description:"I’m sitting quite comfortable over here. When I look to the right, I can see the beach and the ocean."
        }
    );
    Beacons.insert(
        {
          name:"Bomb 2",
          image:"bomb2.jpg",
          description:"Don’t look for me inside the hostel, go outside, don’t look too far, then you will find me!"
        }
    );
    Beacons.insert(
        {
          name:"Bomb 3",
          image:"bomb3.jpg",
          description:"Damn, it smells good in here! They even have a stash of beer in this area."
        }
    );
    Beacons.insert(
        {
          name:"Bomb 4",
          image:"bomb4.jpg",
          description:"Don’t look for me inside the hostel, go outside, take a seat, enjoy the view, take a deep breath, but especially, don’t forget me..."
        }
    );
  }

});
