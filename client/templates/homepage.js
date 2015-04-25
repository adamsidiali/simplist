Template.homepage.events({

  'click .login-google': function () {
    Meteor.loginWithGoogle(function(error) {
      if(error) {
        console.log(error);
      } else {
        console.log(Meteor.user().profile.name);
        Router.go("lists", {"tagslug": "all"});
      }
    });
  },

  'click .login-facebook': function () {
    Meteor.loginWithFacebook(function(error) {
      if(error) {
        console.log(error);
      } else {
        console.log(Meteor.user());
        Router.go("lists", {"tagslug": "all"});
      }
    });
  },

  'click .my-lists': function (e,t) {
    Router.go("lists", {"tagslug": "all"});
  },

  'click .logout': function (e,t) {
    Meteor.logout( function (err) {
      if (err) {
        console.log(err);
      } else {
        Router.go("homepage");
      }
    });
  }

});
