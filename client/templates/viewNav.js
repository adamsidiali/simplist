Template.viewNav.rendered = function () {

    $(".lists-wrap").scroll(function () {
      menuToggle();
    });

    if ($(window).width() < 600) {
      $(".view-nav").addClass("mobile");
    }

};


var menuToggle = function () {

  if ($(".lists-wrap").scrollLeft() == 0 ) {
    $(".view-nav").removeClass("hidden");

    if ($(window).width() > 600) {
      //$(".header-add").fadeOut(250);
      //$(".header-menu i").removeClass("fa-bars");
      $(".header-menu i").removeClass("fa-caret-right");
      $(".header-menu").removeClass("show-menu");
      $(".header-menu").addClass("hide-menu");
    }
  }


  if ($(".lists-wrap").scrollLeft() > 1) {
    $(".view-nav").addClass("hidden");

    if ($(window).width() > 600) {
      //$(".header-add").fadeIn(250);
      // $(".header-menu i").addClass("fa-bars");
      $(".header-menu i").addClass("fa-caret-right");
      $(".header-menu").addClass("show-menu");
      $(".header-menu").removeClass("hide-menu");
    }
  //  $(".view-nav").removeClass("shrink");
  }

};


allTags = [];

Template.viewNav.helpers({

  activeTags: function() {
    return Tags.find({'owner': Meteor.userId(), 'lists.0': {$exists: true}}, {sort: {'name': 1}});
  }


});

Template.viewNav.events({

  "submit .add-list": function (event) {

    var title = event.target.title.value;
    var list_id; // to attach to the item obj created on Lists.insert success

    Lists.insert({
      "owner": Meteor.userId(),
      "title": title,
      "sharedWith": [],
      "createdAt": new Date()
    }, function(err, id) {

      list_id = id; // assign the returned _id of the newly created list obj

      /*Items.insert({
        "list_id": list_id,
        "owner":  Meteor.userId(),
        "item": "item 1",
      }, function(err, id) {
        console.log(id);
      });*/

    });

    event.target.title.value = "";

    FocusFirstListInput();

    return false;

  },

  "click .tags-list-link": function (e,t) {

    if ($(".view-nav").hasClass("mobile")) {
      $(".view-nav").removeClass("active");
      $(".view-nav-mobile-backdrop").fadeOut(100);
    }

    $(".preloader").show();
    setTimeout(function(){
      $(".preloader").fadeOut(200);
    },50);


  },

  "click .view-nav-mobile-backdrop": function (e,t) {
    if ($(".view-nav").hasClass("mobile")) {
      $(".view-nav").removeClass("active");
      $(".view-nav-mobile-backdrop").fadeOut(100);
    }
  },

  "click .logout": function (e,t) {

    Meteor.logout( function (err) {
      if (err) {
        console.log(err);
      } else {
        Router.go("homepage");
      }
    });

  }

});


Template.viewNav.gestures({

  "swipeleft .wrap": function (e,t) {
    if ($(".view-nav").hasClass("mobile")) {
      $(".view-nav").removeClass("active");
      $(".view-nav-mobile-backdrop").fadeOut(100);
    }
  }

});
