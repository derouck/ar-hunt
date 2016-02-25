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
	updateNearestBeacon: function(id) {
		return Meteor.users.update({_id:this.userId},{$set:{nearestBeacon:id}});
	},
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
				createdAt: new Date()
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

		let game = Games.findOne({status: "inProgress", players: {$in:[this.userId]}});

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

						return BOMB_DEFUSED;
					}

					return BOMB_PARTIALLY_DEFUSED;
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

					return BOMB_EXPLODED;
				}
			}
		});
	}
});
