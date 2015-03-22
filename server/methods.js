Meteor.methods({

  removeItem: function (list, item) {
    console.log("removing...");
    Lists.update({ "_id" : list }, { "$pull" : { "items": item }});
  }

});
