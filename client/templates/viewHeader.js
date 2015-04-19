Template.viewHeader.rendered = function () {

  if ($(window).width() < 600) {
    $(".header-menu").addClass("mobile-menu-toggle");
  }

};


Template.viewHeader.events({


  "click .header-menu": function () {
    $(".lists-wrap").animate({ "scrollLeft": 0});
  },

  "click .mobile-menu-toggle": function (e,t) {
    $(".view-nav").addClass("active");
    $(".view-nav-mobile-backdrop").fadeIn(100);
  },

  "click .header-add": function () {


    swal({
      title: "Name your new list:",
      text: "",
      type: "input",
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

        var title = res;
        var list_id; // to attach to the item obj created on Lists.insert success

        Lists.insert({
          "owner": Meteor.user().username,
          "title": title,
          "createdAt": new Date()
        }, function(err, id) {

          list_id = id; // assign the returned _id of the newly created list obj
          console.log(id);

        });

        $(".lists-wrap").animate({ "scrollLeft": 0});
        FocusFirstListInput();

        swal({
          title: "Created " + res + "!",
          text: "",
          type: "success",
          timer: 1000,
          showConfirmButton: false
        });
      }

    });


  }

});
