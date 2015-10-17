Template.post.created = function () {
  this.autorun(function () {
    this.postSubscription = Meteor.subscribe('viewPost', Session.get('postId'));
    this.commentsSubscription = Meteor.subscribe('viewPostComments', Session.get('postId'));
  }.bind(this));
};

Template.post.rendered = function () {
	this.autorun(function () {
    if (!this.postSubscription.ready() || !this.commentsSubscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.post.helpers({
  numComments: function(){
    return Comments.find({postId: Session.get('postId')}).count();
  },
  comments: function(){
    return Comments.find({postId: Session.get('postId')});
  },
  post: function () {
    return Posts.findOne({_id: Session.get('postId')});
  },
  upVoted: function(){
    var res = '';
    if(Meteor.user() && Meteor.user().upVotedPosts && Meteor.user().upVotedPosts.indexOf(Session.get('postId'))>=0){
      res = 'selected';
    }
    return res;
  },
  downVoted: function(){
    var res = '';
    if(Meteor.user() && Meteor.user().downVotedPosts && Meteor.user().downVotedPosts.indexOf(Session.get('postId'))>=0){
      res = 'selected';
    }
    return res;
  }
});

Template.post.events({

  'click .feedback-thumbup': function(){
    var upVote = function(){
      Meteor.call('toggleUpVote',Session.get('postId'),Meteor.userId());
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
      Meteor.call('toggleDownVote',Session.get('postId'),Meteor.userId());
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
      IonModal.open('newComment', {postId: Session.get('postId')});
    };
    if (Meteor.user()) {
      newComment();
    } else {
      IonModal.open('signIn',{callback: newComment});
    }
    return false;
  },

  'click [data-action=share-post]': function (event, template) {
    var msg = Posts.findOne({_id: Session.get('postId')}).title;
    var link = 'http://qaproperties.meteor.com/post/' + Session.get('postId');
    if(window.plugins && window.plugins.socialsharing){
      window.plugins.socialsharing.share(msg, null, null, link)
    }
    else {
      alert('Share is not supported on this device');
    }

    // IonActionSheet.show({
    //   titleText: 'Share Post',
    //   buttons: [
    //     { text: '<i class="icon ion-social-facebook"></i> Facebook' },
    //     { text: '<i class="icon ion-social-twitter"></i> Twitter' }
    //   ],
    //   cancelText: 'Cancel',
    //   buttonClicked: function(index) {
    //     if (index === 0) {
    //       console.log('Facebook!....');
    //       //window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function() {alert('shared!');}, function(errormsg){alert(errormsg);});
    //     }
    //     if (index === 1) {
    //       console.log('Twitter!...');
    //     }
    //     return true;
    //   }
    // });

  }

  
});
