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


    if ( isValidPassword(userPassword) ) {
      Accounts.createUser({email: email, password : password}, function(err){
        if (err) {
          // Inform the user that account creation failed
        } else {
          // Success. Account has been created and the user
          // has logged in successfully.
        }

      });
    }

    return false;

  }

});
