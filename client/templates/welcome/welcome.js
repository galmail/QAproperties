// welcome.js

Template.welcome.created = function () {};

Template.welcome.rendered = function () {};

Template.welcome.helpers({

});

Template.welcome.events({

	'click [data-action=view-terms]': function(){
		IonModal.open('terms');
	},

  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        console.log(err);
        throw new Meteor.Error("Facebook login failed");
      } else {
        Router.go('/topics');
      }
    });
  },

  'click #twitter-login': function(event) {
    Meteor.loginWithTwitter({}, function(err){
      if (err) {
        console.log(err);
        throw new Meteor.Error("Twitter login failed");
      } else {
        Router.go('/topics');
      }
    });
  }

});
