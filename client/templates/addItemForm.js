Template.addItemForm.events({

  "submit .add-item": function (event) {

    var item = event.target.item.value;
    var list_id = this._id;

    Items.insert({
      "list_id": list_id,
      "owner":  Meteor.user().username,
      "item": item
    }, function(err, id) {
      console.log(id);
    });

    event.target.item.value = "";

    return false;

  }

});
