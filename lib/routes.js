Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('lists', {
    path: '/lists/:tagslug',
    data: function () {
      tagslug = this.params.tagslug;

      if (tagslug == "all") {
        Session.set("tag", "");
      } else {
        Session.set("tag", tagslug);
      }


    }

  });


});
