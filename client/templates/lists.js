Template.lists.helpers({
  lists: function() {
    return Lists.find({owner:Meteor.user().username});
  },
  items: function(listId) {
    return Items.find({"owner":Meteor.user().username, "list_id": listId});
  }

});

var toggleItemNav = function (e) {
  var toggle = $(e.target);
  var header = toggle.parent().parent();
  var list = header.parent();


  header.children(".list-menu").slideToggle(100);
  toggle.toggleClass("fa-bars");
  toggle.toggleClass("fa-times");
};

Template.lists.events({

  "click .toggle-list-menu": function (event, template) {
    toggleItemNav(event);
  },

  "click .rename-list": function (e,t) {

  },

  "click .item-text": function (e,t) {
    var p = $(e.target);
    var item = p.parent();
    var form = item.children("form");

    p.hide();
    form.show();
  },

  "submit .edit-item": function (e,t) {

    var newItem = e.target.item.value;
    var form = $(e.target);
    var item = form.parent();
    var p = item.children("p");

    Items.update(this._id, {$set: { "item": newItem }});

    form.hide();
    p.show();

    return false;
  },

  "click .trash-list": function () {
    Lists.remove(this._id);
    Meteor.call("removeItems", this._id);
  },

  "click .trash-item": function (e,t) {
    Items.remove(this._id);
  }

});

Template.lists.gestures({

  "swiperight .item": function (e, t) {
    var list = this;
    console.log();
  }

});
