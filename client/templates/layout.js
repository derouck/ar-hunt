var UUID = "d0d3fa86-ca76-45ec-9bd9-6af490c204d4";

Template.layout.onCreated(function(){
    console.log("IBeacons from layout oncreated");

    var reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "beacons on shelf", uuid: UUID});

    var beaconRegion = reactiveBeaconRegion.getBeaconRegion();


    console.log(beaconRegion);
});
