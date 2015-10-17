Template.sidemenu.created = function () {
  this.autorun(function () {
    this.userSubscription = Meteor.subscribe('user', Meteor.userId());
    this.notificationsSubscription = Meteor.subscribe('notifications',Meteor.userId());
  }.bind(this));
};

Template.sidemenu.rendered = function () {
};

Template.sidemenu.helpers({
  user: function(){
    return Meteor.user();
  },
  numNotifications: function(){
    var res = Posts.getNotifications(Meteor.userId()).count();
    if(res == 0) res = '';
    return res;
  }
});

Template.sidemenu.events({
  
});
