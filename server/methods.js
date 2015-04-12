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

  removeItems: function (listId) {
    Items.remove({ "list_id" : listId});
  }

});
