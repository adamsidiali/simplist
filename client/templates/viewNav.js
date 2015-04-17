Template.viewNav.rendered = function () {

    $(".lists-wrap").scroll(function () {
      menuToggle();
    });

    $("window").resize(function () {
      menuToggle();
    });

};


var menuToggle = function () {
  if ($(".lists-wrap").scrollLeft() == 0 ) {
    $(".view-nav").removeClass("hidden");

    if ($(window).width() > 600) {
      $(".toggle-menu").fadeOut(250);
    }
  }


  if ($(".lists-wrap").scrollLeft() > 1) {
    $(".view-nav").addClass("hidden");
    if ($(window).width() > 600) {
      $(".toggle-menu").fadeIn(250);
    }
  //  $(".view-nav").removeClass("shrink");
  }
};

Template.viewNav.events({

  "submit .add-list": function (event) {

    var title = event.target.title.value;
    var list_id; // to attach to the item obj created on Lists.insert success

    Lists.insert({
      "owner": Meteor.user().username,
      "title": title,
      "createdAt": new Date()
    }, function(err, id) {

      list_id = id; // assign the returned _id of the newly created list obj

      /*Items.insert({
        "list_id": list_id,
        "owner":  Meteor.user().username,
        "item": "item 1",
      }, function(err, id) {
        console.log(id);
      });*/

    });

    event.target.title.value = "";

    FocusFirstListInput();

    return false;

  }

});
