Template.overview.onCreated(function () {
    this.subscribe('users');
    this.subscribe('currentGame');
    this.subscribe('beacons');
});

Template.overview.helpers({
  beacons: () => {
    return Beacons.find();
  }
});
