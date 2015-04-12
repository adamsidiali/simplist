Meteor.methods({

  addItem: function (list, item) {
    console.log("adding" + item + " to " + list + "...");
    Lists.update({ "_id" : list }, {
      "$push" : {
        "items": [
          { "item": item }
        ]
      }
    });
  },

  removeItem: function (list, item) {
    console.log("removing...");
    Lists.update({ "_id" : list }, { "$pull" : { "items": item }});
  }

});
