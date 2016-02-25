var teamNames = [
	"Red Patotoes",
	"Yellow Sea",
	"Orange Panters",
	"Blue Ocean",
	"Soppa de papa",
	"Surf Turf",
	"Boring monkey"
];

Meteor.methods({
	joinGame: function(id) {
		return Games.update(id, {$push: {players: this.userId}});
	},
	startGame: function(id) {
		let beacons = Beacons.find().fetch();

		let shuffledBeacons =_.shuffle(beacons);

		let beacon_ordering = [];
		shuffledBeacons.forEach(function(beacon){
			beacon_ordering.push(beacon._id);
		});

		console.log(beacon_ordering);


		return Games.update(id, {$set: {status: 'inProgress', ordering: beacon_ordering, wiresCut: 0, dateStarted: new Date()}});
	},
	cutWire: function(currentBeaconId) {
		let game = Games.find({status: "inProgress", players: this.userId});
		console.log(game);

		if(! game){
			throw new Meteor.Error(403, "You don't have a game.");
		}

		let amountOfBombs = game.ordering.length;

		game.ordering.forEach(function(beaconId, index){
			if(beaconId == currentBeaconId){
				// index of bomb will start at 0, so first bomb will be zero and at that moment wirestCut=0 as well
				if(index == game.wiresCut){
					Games.update(game._id, {$inc: {wiresCut: 1}});

					if(amountOfBombs == game.wiresCut + 1){
						// all the bombs are cut, hurray!
						Games.update(game._id, {$set: {status: 'Finished', dateEnd: new Date()}});
					}
					// Allright you've cut the wire
				}else{
					Games.update(game._id, {$set: {status: 'Exploded', dateEnd: new Date()}});

					let shuffledTeamNames =_.shuffle(teamNames);
					Games.insert(
						{
							teamName: shuffledTeamNames[0],
							status: "ready",
							players: game.players,
							createdAt: new Date()
						}
					);
				}
			}
		});
	}
});
