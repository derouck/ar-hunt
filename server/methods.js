var teamNames = [
	"Red Papas",
	"Yellow Flowers",
	"Orange Panthers",
	"Blue Ocean",
	"Soppa de papa",
	"Surf Turf",
	"Boring monkey"
];

Meteor.methods({
	joinGame: function(id) {
		return Games.update(id, {$push: {players: this.userId}});
	},
	createGame: function() {
		if(! this.userId){
			throw new Meteor.error(403, "Not authorized to create games");
		}

		let shuffledTeamNames =_.shuffle(teamNames);
		let teamName = shuffledTeamNames[0];
		let currentTeamNameCount = Games.find({teamName: teamName}).count();

		if(currentTeamNameCount > 0){
			teamName += " " + currentTeamNameCount++;
		}

		let gameId = Games.insert(
			{
				teamName: teamName,
				status: "ready",
				players: [this.userId],
				dateStarted: new Date()
			}
		);

		return gameId;
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
		console.log(currentBeaconId);
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

						let endDate = new Date();
						Games.update(game._id, {$set: {status: 'Finished', dateEnd: endDate}});

						return BOMB_DEFUSED;
					}

					return BOMB_PARTIALLY_DEFUSED;
				}else{
					Games.update(game._id, {$inc: {mistakesMade: 1}});

					return BOMB_EXPLODED;
				}
			}
		});
	}
});
