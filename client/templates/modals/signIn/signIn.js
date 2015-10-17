Template.signIn.events({

	'click #facebook-login': function(event) {
    var self = this;
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
      	console.log(err);
        throw new Meteor.Error("Facebook login failed");
      } else {
        IonModal.close();
        if(self.callback) self.callback();
      }
    });
  },

  'click #twitter-login': function(event) {
    var self = this;
    Meteor.loginWithTwitter({}, function(err){
      if (err) {
        console.log(err);
        throw new Meteor.Error("Twitter login failed");
      } else {
        IonModal.close();
        if(self.callback) self.callback();
      }
    });
  }

  // 'click #logout': function(event) {
  //   Meteor.logout(function(err){
  //     if (err) {
  //       throw new Meteor.Error("Logout failed");
  //     }
  //   });
  // }

});
