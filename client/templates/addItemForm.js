Template.addItemForm.events({

  "submit .add-item": function (event) {

    var currentTime = new Date();
    var item = event.target.item.value;

    Lists.update({_id: this._id}, {
      $push: {
        items: {
          "item": item,
          "owner": Meteor.user().username,
          "list_id": this._id,
          "createdAt": currentTime
          }
        }
    });

    event.target.item.value = "";

    return false;

  }

});
