Template.viewNav.rendered = function () {

    $(".lists-wrap").scroll(function () {
      if ($(".lists-wrap").scrollLeft() > 0 ) {
        $(".view-nav").addClass("disabled");
      } else {
        $(".view-nav").removeClass("disabled");
      }
    });

};
