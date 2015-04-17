Template.lists.rendered = function () {

  $(".lists-wrap").scroll(function(e){

    e.preventDefault();

  });

};


Template.lists.helpers({

  viewTitle: "All Lists",

  lists: function() {
    return Lists.find({owner:Meteor.user().username}, {sort: {createdAt: -1}});
  },
  items: function(listId) {
    return Items.find({"owner":Meteor.user().username, "list_id": listId});
  }

});

var toggleListNav = function (e) {
  // var toggle = $(e.target);
  var header = $(e.target);
  var list = header.parent();

  header.children(".list-menu").slideToggle(100);

  list.children(".list-items-wrap").toggleClass("hidden");

};

Template.lists.events({

  "click .list-header": function (event, template) {
    toggleListNav(event);
  },

  "click .rename-list": function (e,t) {

    $(e.target).parent().slideUp(100);
    $(e.target).parents(".list").children(".list-items-wrap").removeClass("hidden");

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

    $(e.target).parent().slideUp(100);
    $(e.target).parents(".list").children(".list-items-wrap").removeClass("hidden");


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

    $(e.target).parent().slideUp(100);

  },

  "click .trash-item": function (e,t) {
    Items.remove(this._id);
  }

});

Template.lists.gestures({

  "swipeleft .lists-wrap": function (e,t) {
    var left = $(".lists-wrap").scrollLeft();
    var more = $(window).width()*0.935;

    $(".lists-wrap").animate({ "scrollLeft": left+more }, 200);
  },

  "swiperight .lists-wrap": function (e,t) {
    var left = $(".lists-wrap").scrollLeft();
    var more = $(window).width()*0.935;

    $(".lists-wrap").animate({ "scrollLeft": left-more }, 200);
  }

});
