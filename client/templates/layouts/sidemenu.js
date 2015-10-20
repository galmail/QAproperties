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

  'click [data-action="signout"]': function(){
    IonActionSheet.show({
      titleText: 'Are you sure you wish to signout?',
      buttons: [
        { text: 'Sign Out' }
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          Meteor.logout(function(err){
            if (err) {
              throw new Meteor.Error("Logout failed");
            }
            else {
              delete(localStorage.firstTimeUser);
              //Router.go('/');
              window.location.href="/";
            }
          });
        }
        return true;
      }
    });
  }
  
});
