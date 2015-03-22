Template.lists.helpers({
  lists: function() {
    return Lists.find({owner:Meteor.user().username});
  }

});


Template.lists.events({

  "click .item": function (event, template) {
    var item = this;
    var list = template.parentData(1);
    console.log(item + "  "+ list);


  }

});

Template.lists.gestures({
  "swiperight .list": function (event, template) {
    msg("hello!");
  }
});
