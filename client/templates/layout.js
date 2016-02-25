var UUID = "B9407F30-F5F8-466E-AFF9-25556B57FE6D";
var reactiveBeaconRegion;

if(Meteor.isClient){
    if(Meteor.isCordova) {
        Template.layout.onCreated(function () {
            if (Meteor.isCordova) {
                //var UUID = "d0d3fa86-ca76-45ec-9bd9-6af490c204d4";
                //UUID = "b9407f30-f5f8-466e-aff9-25556b57fe6d";
                //UUID = "d0d3fa86-ca76-45ec-9bd9-6af4bbe4d46d";
                //UUID = "D0D3FA86-CA76-45EC-9BD9-6AF428C8C61F";
                //UUID = UUID.toUpperCase();
                reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "beacons on shelf", uuid: UUID});
            }
        });

        Template.layout.onRendered(function(){
            this.autorun(function () {
                var beaconRegion = reactiveBeaconRegion.getBeaconRegion();
                console.log(beaconRegion);
            });
        });
    }
};