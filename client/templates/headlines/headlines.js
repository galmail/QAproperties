Template.headlines.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('headlines',Router.current().params._id);
  }.bind(this));
};

Template.headlines.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.headlines.helpers({
  topic: function(){
    return Session.get('topic');
  },
  headlines: function () {
    return Posts.getHeadlines(Router.current().params._id);
  }
});

Template.headlines.events({
  'click .item': function (event, template) {
    Session.set('postId',this._id);
    IonModal.open('post');
    return false;
  },
  'click [data-action="new-question"]': function(){
    if (Meteor.user()) {
      IonModal.open('newQuestion');
    } else {
      IonModal.open('signIn');
    }
    return false;
  }
});
