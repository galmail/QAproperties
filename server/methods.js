Meteor.methods({

  notifyAdmin: function(postId,isComment){
    console.log("inside notifyAdmin...");
    var adminUsers = Meteor.users.find({role: 'admin'});
    var msg = "Someone posted a question!";
    if(isComment){
      msg = "Someone sent a comment!";
    }
    adminUsers.forEach(function(user){
      console.log('sending push notification to admin userId: ' + user._id);
      Push.send({
        from: 'QAproperties',
        title: 'New Message',
        text: msg,
        badge: Posts.getNotifications(user._id).count()+1,
        query: {
          userId: user._id
        },
        payload: {postId: postId}
      });
    });
  },

  notifyUser: function(userId,postId,isComment){
    var user = Meteor.users.findOne({_id: userId});
    console.log('sending push notification to user with userId: ' + user._id);
    var msg = "Someone answered your question!";
    if(isComment){
      msg = "Someone commented on your question!";
    }
    Push.send({
      from: 'QAproperties',
      title: 'New Message',
      text: msg,
      badge: Posts.getNotifications(user._id).count()+1,
      query: {
        userId: user._id
      },
      payload: {postId: postId}
    });
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
  }

});
