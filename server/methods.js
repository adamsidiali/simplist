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
  },

  addTag: function (listId, tag) {

    var slug = tag.replace(/[^a-zA-Z0-9\s]/g,"");
    slug = slug.toLowerCase();
    slug = slug.replace(/\s/g,'-');

    if (Tags.find({"slug": slug}).count() === 0) {
      Tags.insert({
        "owner": Meteor.user().username,
        "name": tag,
        "slug": slug,
        "lists": [listId],
        "createdAt": new Date()
      });

    } else {
      Tags.update({"slug": slug}, {$push: {"lists": listId}});

    }


  }

});
