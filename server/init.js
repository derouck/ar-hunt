Meteor.startup(function () {

  if (Games.find({status:"ready"}).count() === 0) {
    Games.insert(
        {
          teamName:"React Lovers",
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
          description:"Try to find me"
        }
    );
    Beacons.insert(
        {
          name:"Bomb 2",
          image:"bomb2.jpg",
          description:"Boooommmm!"
        }
    );
    Beacons.insert(
        {
          name:"Bomb 3",
          image:"bomb3.jpg",
          description:"What's your last wish?"
        }
    );
    Beacons.insert(
        {
          name:"Bomb 4",
          image:"bomb4.jpg",
          description:"I can be activated remotely"
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
