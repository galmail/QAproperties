Template.topics.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('topics');
  }.bind(this));
};

Template.topics.rendered = function () {
  localStorage.setItem("firstTimeUser","no");

  if(Meteor.isCordova && !Push.token && Meteor.user() && Meteor.user().role=="admin"){
    IonModal.open('acceptPushNotifications');
  }

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
  },
  getTopicName: function (index) {
    var res = '';
    var topic = Topics.findOne({},{sort: {position: 1}, skip: parseInt(index)});
    if(topic) res = topic.name;
    return res;
  },
  getTopicThumbnail: function(index){
    var res = '';
    var topic = Topics.findOne({},{sort: {position: 1}, skip: parseInt(index)});
    if(topic) res = topic.thumbnail;
    return res;
  },
  getTopicId: function(index){
    var res = '';
    var topic = Topics.findOne({},{sort: {position: 1}, skip: parseInt(index)});
    if(topic) res = topic._id;
    return res;
  }
});


Template.topics.events({
  // 'click .topic': function (event, template) {
    
  //   return true;
  // }
});