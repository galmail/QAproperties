Template.headlines.created = function () {
  this.autorun(function () {
    this.headlinesSubscription = Meteor.subscribe('headlines',Router.current().params._id);
    this.topicSubscription = Meteor.subscribe('viewTopic',{topicId: Router.current().params._id});
  }.bind(this));
};

Template.headlines.rendered = function () {
  this.autorun(function () {
    if (!this.headlinesSubscription.ready() || !this.topicSubscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.headlines.helpers({
  topic: function(){
    var topic = Topics.findOne({_id: Router.current().params._id});
    if(topic) return topic.name;
  },
  headlines: function () {
    return Posts.getHeadlines(Router.current().params._id);
  }
});

Template.headlines.events({
  // 'click .item': function (event, template) {
  //   window.debugme = event;
  //   console.log(event.target.dataset.postId);
  //   Router.go('/posts/'+this._id);
  //   return false;
  // },
  'click [data-action="new-question"]': function(){
    if (Meteor.user()) {
      IonModal.open('newQuestion');
    } else {
      IonModal.open('signIn',{callback: function(){
        IonLoading.show();
        Meteor.setTimeout(function(){
          IonModal.open('newQuestion');
          IonLoading.hide();
        },500);
      }});
    }
    return false;
  }
});
