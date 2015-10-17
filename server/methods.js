Meteor.methods({

  notifyAdmin: function(){
    console.log("inside notifyAdmin...");
    var adminUsers = Meteor.users.find({"profile.email": {$in: Meteor.settings.qaproperties.adminUsers}});
    adminUsers.forEach(function(user){
      //TODO send push notification to admin user
      console.log('sending push notification to admin userId: ' + user._id);
    });
  },

  notifyUser: function(userId){
    var user = Meteor.users.findOne({_id: userId});
    //TODO send push notification to user
    console.log('sending push notification to user with userId: ' + user._id);
  },

  toggleUpVote: function(postId,userId){
    var currentUser = Meteor.users.findOne({_id: userId});
    if(!currentUser) return;
    var upVotePosition = currentUser.upVotedPosts.indexOf(postId);
    var downVotePosition = currentUser.downVotedPosts.indexOf(postId);
    if(upVotePosition>=0){
      currentUser.upVotedPosts.splice(upVotePosition,1);
      Posts.update({_id: postId},{$inc: {upVotes: -1}});
    }
    else {
      currentUser.upVotedPosts.push(postId);
      Posts.update({_id: postId},{$inc: {upVotes: 1}});
      if(downVotePosition >= 0){
        currentUser.downVotedPosts.splice(downVotePosition,1);
        Posts.update({_id: postId},{$inc: {downVotes: -1}});
      }
    }

    // save changes to the user in database
    Meteor.users.update({_id: userId},{
      $set: {
        upVotedPosts: currentUser.upVotedPosts,
        downVotedPosts: currentUser.downVotedPosts
      }
    });

  },

  toggleDownVote: function(postId,userId){
    var currentUser = Meteor.users.findOne({_id: userId});
    if(!currentUser) return;
    var upVotePosition = currentUser.upVotedPosts.indexOf(postId);
    var downVotePosition = currentUser.downVotedPosts.indexOf(postId);
    if(downVotePosition>=0){
      currentUser.downVotedPosts.splice(downVotePosition,1);
      Posts.update({_id: postId},{$inc: {downVotes: -1}});
    }
    else {
      currentUser.downVotedPosts.push(postId);
      Posts.update({_id: postId},{$inc: {downVotes: 1}});
      if(upVotePosition >= 0){
        currentUser.upVotedPosts.splice(upVotePosition,1);
        Posts.update({_id: postId},{$inc: {upVotes: -1}});
      }
    }

    // save changes to the user in database
    Meteor.users.update({_id: userId},{
      $set: {
        upVotedPosts: currentUser.upVotedPosts,
        downVotedPosts: currentUser.downVotedPosts
      }
    });
  },

  getNumNotifications: function(userId){
    var res = '';
    var currentUser = Meteor.users.findOne({_id: userId});
    if(!currentUser) return res;
    if(currentUser.role == 'admin'){
      res = Posts.getAdminNotifications().count();
    }
    else {
      res = Posts.getUserNotifications(userId).count();
    }
    return res;
  },

  markPostAsRead: function(postId){
    Posts.update({_id: postId},{$set: {read: true}});
  },

  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  }
});
