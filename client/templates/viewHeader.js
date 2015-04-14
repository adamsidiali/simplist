Template.viewHeader.events({

  "submit .add-list": function (event) {

    /* var title = event.target.title.value;
    var list_id; // to attach to the item obj created on Lists.insert success

    Lists.insert({
      "owner": Meteor.user().username,
      "title": title,
      "createdAt": new Date()
    }, function(err, id) {

      list_id = id; // assign the returned _id of the newly created list obj

      Items.insert({
        "list_id": list_id,
        "owner":  Meteor.user().username,
        "item": "item 1",
      }, function(err, id) {
        console.log(id);
      });

    });

    event.target.title.value = ""; */

    Dialogs.prompt("Type a new list name", function (res) {
      console.log(res);
    }, "new-list", "Add List", "My New List")

    return false;

  }

});
