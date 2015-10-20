Comments = new Mongo.Collection('comments');

Comments.before.insert(function (userId, comment) {
  if(Meteor.isServer){
    var user = Meteor.users.findOne({_id: userId});
    if(user.role!='admin'){
      Meteor.call("notifyAdmin",comment.postId,true);
    }
    else {
      var post = Posts.findOne({_id: comment.postId});
      if(post.askedBy!=null && post.askedBy!=userId){
        Meteor.call("notifyUser",post.askedBy,post._id,true);
      }
    }
  }
});


Comments.helpers({
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  }
});

Comments.attachSchema(new SimpleSchema({
  body: {
    type: String,
    autoform: {
      rows: 6,
      'label-type': 'placeholder',
      placeholder: 'Add your comment…'
    }
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  postId: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  }
}));
