Template.lists.rendered = function () {

  $(".lists-wrap").scroll(function(e){

    e.preventDefault();

  });

  var el = document.getElementById('lists');
  var sortable = Sortable.create(el);


};


Template.lists.helpers({

  viewTitle: function () {
    return Session.get("currentTagName");
  },

  lists: function() {

    var currentTagSlug = Session.get("tag");

    if (currentTagSlug == "") {
      Session.set("currentTagName", "All Lists");

      return Lists.find({$or: [{owner:Meteor.userId()},{sharedWith: Meteor.userId()}]}, {sort: {createdAt: -1}});
    } else {
      var tag = Tags.findOne({"slug":currentTagSlug});

      Session.set("currentTagName", tag.name);

      return Lists.find({owner:Meteor.userId(), _id: { $in: tag.lists }}, {sort: {createdAt: -1}});
    }

  },
  items: function(listId) {

    var lists = Lists.find({$or: [{owner:Meteor.userId()},{sharedWith: Meteor.userId()}]}, {sort: {createdAt: -1}}).fetch();
    var all = [];
    var items = Items.find({list_id: listId}).fetch();

    console.log(lists);
    console.log(items);



    return items;
  },
  tags: function(listId) {
    return Tags.find({"owner":Meteor.userId(), "lists": listId});
  },
  settings: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '',
          collection: Tags,
          field: "name",
          filter: {"owner": Meteor.userId()},
          template: Template.tagAutoList,
          noMatchTemplate: Template.noTagMatch
        }
      ]
    };
  }

});

var toggleListNav = function (e) {
  // var toggle = $(e.target);
  var header = $(e.target);
  var list = header.parent();

  header.children(".list-menu").slideToggle(100);
  header.children(".bar").children(".fa").toggleClass("fa-caret-down");
  header.children(".bar").children(".fa").toggleClass("fa-caret-up");

  list.children(".list-items-wrap").toggleClass("hidden");
  list.children(".add-item").toggleClass("hidden");

};

Template.lists.events({

  "click .list-header": function (event, template) {
    toggleListNav(event);
  },

  "submit .add-tag": function (e,t) {

    var list_id = this._id;
    var tag = e.target.tag.value;

    Meteor.call("addTag", list_id, tag);

    e.target.tag.value = "";

    return false;
  },

  "autocompleteselect .add-tag>input": function (e,t,tag) {
    console.log("grabbed existing: " + tag.name);
    var list_id = $(e.target).attr("listId");

    Meteor.call("addTag", list_id, tag.name);

    e.target.value = "";
  },

  "click .remove-tag": function (e,t) {

    var listId = $(e.target).attr("data-attached-list");
    Tags.update({_id: this._id}, {$pull: {lists: listId}});

  },

  "click .rename-list": function (e,t) {

    $(e.target).parents(".list-menu").slideUp(100);
    $(e.target).parents(".list").children(".list-items-wrap").removeClass("hidden");
    $(e.target).parents(".list").children(".add-item").removeClass("hidden");
    $(e.target).parents(".list-header").children(".bar").children(".toggle-list-menu").toggleClass("fa-caret-down");
    $(e.target).parents(".list-header").children(".bar").children(".toggle-list-menu").toggleClass("fa-caret-up");

    var list_id = this._id;
    var title = this.title;

    swal({
      title: "Rename " + title,
      type: "input",
      text: "",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonColor: "#32DE8A"
    }, function (res) {

      if (res === false) {
        return false;
      } else if (res === "") {
        swal.showInputError("Your list name can't be blank!");
        return false;
      } else {
        Lists.update(list_id, { $set: {"title": res }});
        console.log("title update to " + res);

        swal({
          title: "List renamed to " + res + "!",
          text: "",
          type: "success",
          timer: 1000,
          showConfirmButton: false
        });

      }
    });


  },

  "click .item-text": function (e,t) {
    var p = $(e.target);
    var item = p.parent();
    var form = item.children("form");

    p.hide();
    form.show();

    form.children("input").focus();
  },

  "focus .edit-item": function (e,t) {
    var wrap = $(event.target).parents(".list").children(".list-items-wrap");
    wrap.scrollTo($(event.target));
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

  "click .trash-list": function (e,t) {

    $(e.target).parents(".list-menu").slideUp(100);
    $(e.target).parents(".list").children(".list-items-wrap").removeClass("hidden");
    $(e.target).parents(".list").children(".add-item").removeClass("hidden");
    $(e.target).parents(".list-header").children(".bar").children(".toggle-list-menu").toggleClass("fa-caret-down");
    $(e.target).parents(".list-header").children(".bar").children(".toggle-list-menu").toggleClass("fa-caret-up");


    var id = this._id;

    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this list!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it",
      closeOnConfirm: false
    }, function () {

      Meteor.call("removeListFromTags", id);

      Lists.remove(id);
      Meteor.call("removeItems", id);
      console.log("deleted");

      swal({
        title: "List deleted!",
        text: "",
        type: "success",
        timer: 1000,
        showConfirmButton: false
      });

    });

  /*  Dialogs.confirm("Really delete list?", function (res) {
      if (res === 1) {
        Lists.remove(id);
        Meteor.call("removeItems", id);
        console.log("deleted");
      } else {
        console.log("not deleted");
      }
    }, "Delete List", ["Delete List", "Nevermind"]);*/

  },

  "click .trash-item": function (e,t) {
    Items.remove(this._id);
  }

});

Template.lists.gestures({

  "swipeleft .lists-wrap": function (e,t) {
    var left = $(".lists-wrap").scrollLeft();
    var more = $(document).width();

    $(".lists-wrap").animate({ "scrollLeft": left+more }, 200);
  },

  "swiperight .lists-wrap": function (e,t) {
    var left = $(".lists-wrap").scrollLeft();
    var more = $(window).width();

    $(".lists-wrap").animate({ "scrollLeft": left-more }, 200);
  }

});
