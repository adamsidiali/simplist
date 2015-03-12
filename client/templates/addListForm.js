Template.lists.events({

  "submit .add-list": function (event) {

    var listTitle = event.target.listTitle.value;

    Lists.insert({
      "owner": Meteor.user().username,
      "title": listTitle,
      "items": []
    });

    event.target.listTitle.value = "";

    return false;

  }

});
