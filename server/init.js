Meteor.startup(function () {
    if (Beacons.find().count() === 0) {
        Beacons.insert({
            'uuid': "b9407f30-f5f8-466e-aff9-25556b57fe6d",
            'name': "blue",
            'minor': 59685,
            'major': 38452,
            'description': "xxx",
            name: "Bomb 1",
            image: "bomb1.jpg",
            description: "Boooommmm!"

        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af490c204d4",
            'name': "shoe",
            'minor': 24729,
            'major': 8745,
            'description': "xxx",
            name: "Bomb 2",
            image: "bomb2.jpg",
            description: "Try to find me"

        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af4bbe4d46d",
            'name': "car",
            'minor': 59907,
            'major': 1155,
            'description': "xxx",
            name: "Bomb 3",
            image: "bomb3.jpg",
            description: "What's your last wish?"

        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af482ad00bd",
            'name': "bicycle",
            'minor': 55579,
            'major': 8158,
            'description': "xxx",
            name: "Bomb 4",
            image: "bomb4.jpg",
            description: "I can be activated remotely"

        });
    }

  Games.remove({});
  if (Games.find({status:"ready"}).count() === 0) {

      // fetch all beacons and shuffle them for a new game
      let beacons = Beacons.find().fetch();

      let shuffledBeacons =_.shuffle(beacons);

      let beacon_ordering = [];
      shuffledBeacons.forEach(function(beacon){
          beacon_ordering.push(beacon._id);
      });

      Games.insert(
        {
          teamName:"React Lovers",
          status:"ready",
          players:[],
          ordering: beacon_ordering,
          createdAt: new Date()
        }
    );
  }

    const users = [
        "chris@ff.com",
        "alexis@ff.com",
        "jesper@ff.com"
    ];


    if(Meteor.users.find().count() == 0){
        users.forEach(function(user){
            let details = {
                email: user,
                password: "meteorff"
            };
            Accounts.createUser(details);
        });
    }
});
