Template.addItemForm.events({

  "submit .add-item": function (event) {

    var item = event.target.item.value;

    Lists.update({_id: this._id}, {
      $push: {
        items: item
      }
    });

    event.target.item.value = "";

    return false;

  }

});
