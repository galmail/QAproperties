Template.notifications.created = function () {

};

Template.notifications.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
  else {
  	this.autorun(function () {
      this.subscription = Meteor.subscribe('notifications',Meteor.userId());
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
        Push.setBadge(0);
      }
	  }.bind(this));
  }
};

Template.notifications.helpers({
	hasNotifications: function(){
		return (Posts.find({}).count() > 0);
	},
  headlines: function () {
    return Posts.find({});
  }
});

Template.notifications.events({
  // 'click .item': function(){
  //   Router.go('/posts/'+this._id);
  // }
});

