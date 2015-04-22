Template.addItemForm.events({

  "submit .add-item": function (event) {

    var item = event.target.item.value;
    var list_id = this._id;

    Items.insert({
      "list_id": list_id,
      "owner":  Meteor.userId(),
      "item": item
    }, function(err, id) {
      console.log(id);
    });

    event.target.item.value = "";

    var wrap = $(event.target).parents(".list").children(".list-items-wrap");
    wrap.scrollTop(wrap.prop("scrollHeight"));

    return false;

  },

  "focus .add-item": function () {

    var wrap = $(event.target).parents(".list").children(".list-items-wrap");
    wrap.scrollTop(wrap.prop("scrollHeight"));

  }

});
