Meteor.startup(function () {
  msg = function (text) {
    alert(text);
  }

  FocusFirstListInput = function () {
    var list = $(".lists-wrap").children(".list:first");
    list.children(".add-item").children("input").focus();
  };

});
