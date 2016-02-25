Template.overview.onCreated(function () {
    this.subscribe('users');
    this.subscribe('currentGame');
    this.subscribe('beacons');
});

Template.overview.helpers({
  beacons: () => {
    let game = Games.findOne();
    console.log(game);
    console.log(game.beacons());
    return game.beacons();
  }
});
