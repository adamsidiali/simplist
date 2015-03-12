Template.lists.helpers({
  lists: function() {
    return Lists.find({owner:Meteor.user().username});
  }

});
