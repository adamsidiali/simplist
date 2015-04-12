Template.lists.helpers({
  lists: function() {
    return Lists.find({owner:Meteor.user().username});
  }

});

var toggleItemNav = function (e) {
  toggle = $(e.target);
  header = toggle.parent();

  header.children(".list-menu").slideToggle(200);
  toggle.toggleClass("fa-bars");
  toggle.toggleClass("fa-times");
}

Template.lists.events({

  "click .toggle-list-menu": function (event, template) {
    toggleItemNav(event);
  },

  "click .rename-list": function (e,t) {

  },

  "click .trash-list": function () {
    Lists.remove(this._id);

  },

  "click .trash-item": function (e,t) {

    Lists.update({"_id": this.list_id },
     {
        "$pull": {
            "items": this
         }
     });
  }

});

Template.lists.gestures({

  "swiperight .item": function (e, t) {
    var list = this;
    console.log();
  }

});
