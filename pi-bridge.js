if (Meteor.isClient) {

  Template.hello.helpers({
    counter: function () {
     return Pins.findOne({number:16}).state;
   },
   input: function(){
    return Pins.findOne({number:12}).state;
   },
   brig: function(){
    return Brig.findOne().state;
   }
 });

  Template.hello.events({
    'click button': function () {
      Pins.update({_id:Pins.findOne({number:16})._id},{$set:{state:!Pins.findOne({number:16}).state}});
    }
  });
}

Pins = new Mongo.Collection('pins');
Brig = new Mongo.Collection('brig');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    pinInput:function(pin,value){
      if (Pins.findOne({number:pin}).type =="input")
        Pins.update({number:pin},{$set:{state:value}});
    },
    brigToggle:function(){
      Brig.update({_id:Brig.findOne()._id},{$set:{state:!Brig.findOne().state}});
      return Brig.findOne().state;
    }
  });
}
