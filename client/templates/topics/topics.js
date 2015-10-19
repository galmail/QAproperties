Template.topics.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('topics');
  }.bind(this));
};

Template.topics.rendered = function () {
  localStorage.setItem("firstTimeUser","no");
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.topics.helpers({
  topics: function () {
    return Topics.find();
  }
});


Template.topics.events({
  'click .item': function (event, template) {
    Session.set('topic',this.name);
    return true;
  }
});