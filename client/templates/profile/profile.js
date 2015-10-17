Template.profile.created = function () {
  
};

Template.profile.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
};

Template.profile.helpers({
  user: function () {
    return Meteor.user();
  }
});

Template.profile.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      IonModal.close();
      Router.go('/');
    });
  }
});
