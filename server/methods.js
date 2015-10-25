Meteor.methods({

  removeQuestion: function(postId){
    if(Meteor.user().role=="admin") Posts.remove({_id: postId});
  },

  setAdminUser: function(email){
    Meteor.users.update({'profile.email': email},{$set: {role: "admin"}},{multi: true});
  },

  notifyAdmin: function(postId,comment){
    var adminUsers = Meteor.users.find({role: 'admin'});
    console.log("inside notifyAdmin..");
    var msg = "Someone posted a question!";
    var nickname = "@guest";
    if(Meteor.user()) nickname = Meteor.user().profile.first_name;
    if(comment!=null){
      msg = nickname + ": " + comment.body;
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
        payload: {postId: postId, isComment: (comment!=null)}
      });
    });
  },

  notifyUser: function(userId,postId,comment){
    console.log("inside notifyUser...");
    var user = Meteor.users.findOne({_id: userId});
    if(user==null) return;
    console.log('sending push notification to user with userId: ' + user._id);
    var msg = "Someone answered your question!";
    var nickname = "@guest";
    if(Meteor.user()) nickname = Meteor.user().profile.first_name;
    if(comment!=null){
      msg = nickname + ": " + comment.body;
    }
    Push.send({
      from: 'QAproperties',
      title: 'New Message',
      text: msg,
      badge: Posts.getNotifications(user._id).count()+1,
      query: {
        userId: user._id
      },
      payload: {postId: postId, isComment: (comment!=null)}
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

  markPostAsRead: function(userId,postId){
    // if user is the one who asked then marked as read...
    var post = Posts.findOne({_id: postId});
    if(post.askedBy != userId) return;
    Posts.update({_id: postId},{$set: {read: true}});
  }

});
