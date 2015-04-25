var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

var isValidPassword = function(val) {
  return val.length >= 6 ? true : false;
}


Template.register.events({

  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var email = t.find('#account-email').value;
    email = trimInput(email);
    var password = t.find('#account-password').value;


    if ( isValidPassword(password) ) {
      Accounts.createUser({email: email, password : password}, function(err){
        if (err) {
          alert("failed to create user");
        } else {
          alert("created user");
        }

      });
    }

    return false;

  }

});
