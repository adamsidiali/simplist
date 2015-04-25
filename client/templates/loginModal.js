Template.loginModal.events({
  'click .btn-create-account': function() {
    return Session.set('createOrSignIn', 'create');
  },
  'click .btn-sign-in': function() {
    return Session.set('createOrSignIn', 'signin');
  },
  'submit form': function(e) {
    return e.preventDefault();
  }
});

var submitHandler = function() {
    var createOrSignIn = Session.get('createOrSignIn');
    var user = {
      email: $('[name="emailAddress"]').val(),
      password: $('[name="password"]').val()
    };
    if (createOrSignIn === "create") {
      return Meteor.call('validateEmailAddress', user.email, function(error, response) {});
    } else {
      return Meteor.loginWithPassword(user.email, user.password, function(error) {
        if (error) {
          return alert(error.reason);
        } else {
          return $('.modal-backdrop').hide();
        }
      });
    }
  }
