Template.post.created = function () {
  this.autorun(function () {
    this.postSubscription = Meteor.subscribe('viewTopic',{postId: Router.current().params._id});
    this.postSubscription = Meteor.subscribe('viewPost', Router.current().params._id);
    this.commentsSubscription = Meteor.subscribe('viewPostComments', Router.current().params._id);
  }.bind(this));
};

Template.post.rendered = function () {
	this.autorun(function () {
    if (!this.postSubscription.ready() || !this.commentsSubscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
      Meteor.call('markPostAsRead',Router.current().params._id); // mark post as read
    }
  }.bind(this));
};

Template.post.helpers({
  topic: function(){
    var post = Posts.findOne({_id: Router.current().params._id});
    if(post==null) return 'Q&A';
    var topic = Topics.findOne({_id: post.topicId});
    if(topic==null) return 'Q&A';
    return topic.name;
  },
  numComments: function(){
    return Comments.find({postId: Router.current().params._id}).count();
  },
  comments: function(){
    return Comments.find({postId: Router.current().params._id});
  },
  post: function () {
    return Posts.findOne({_id: Router.current().params._id});
  },
  upVoted: function(){
    var res = '';
    if(Meteor.user() && Meteor.user().upVotedPosts && Meteor.user().upVotedPosts.indexOf(Router.current().params._id)>=0){
      res = 'selected';
    }
    return res;
  },
  downVoted: function(){
    var res = '';
    if(Meteor.user() && Meteor.user().downVotedPosts && Meteor.user().downVotedPosts.indexOf(Router.current().params._id)>=0){
      res = 'selected';
    }
    return res;
  }
});

Template.post.events({

  'click .feedback-thumbup': function(){
    var upVote = function(){
      Meteor.call('toggleUpVote',Router.current().params._id,Meteor.userId());
    };
    if (Meteor.user()) {
      upVote();
    } else {
      IonModal.open('signIn',{callback: upVote});
    }
    return false;
  },

  'click .feedback-thumbdown': function(){
    var downVote = function(){
      Meteor.call('toggleDownVote',Router.current().params._id,Meteor.userId());
    };
    if (Meteor.user()) {
      downVote();
    } else {
      IonModal.open('signIn',{callback: downVote});
    }
    return false;
  },

  'click [data-action="new-comment"]': function(){
    var newComment = function(){
      IonModal.open('newComment', {postId: Router.current().params._id});
    };
    if (Meteor.user()) {
      newComment();
    } else {
      IonModal.open('signIn',{callback: function(){
        IonLoading.show();
        Meteor.setTimeout(function(){
          newComment();
          IonLoading.hide();
        },500);
      }});
    }
    return false;
  },

  'click [data-action=share-post]': function (event, template) {
    var msg = Posts.findOne({_id: Session.get('postId')}).title;
    var link = 'http://qaproperties.meteor.com/posts/' + Router.current().params._id;
    if(window.plugins && window.plugins.socialsharing){
      window.plugins.socialsharing.share(msg, null, null, link)
    }
    else {
      alert('Share is not supported on this device');
    }
  },

  'click [data-action="answer-question"]': function(){
    IonModal.open('answerQuestion', {postId: Router.current().params._id});
  }

  
});
