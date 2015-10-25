Template.signIn.events({

	'click #facebook-login': function(event) {
    var self = this;
    IonLoading.show();
    Meteor.loginWithFacebook({}, function(err){
      IonLoading.hide();
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
    IonLoading.show();
    Meteor.loginWithTwitter({}, function(err){
      IonLoading.hide();
      if (err) {
        console.log(err);
        throw new Meteor.Error("Twitter login failed");
      } else {
        IonModal.close();
        if(self.callback) self.callback();
      }
    });
  }

});
