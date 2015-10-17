Posts = new Mongo.Collection('posts');

Posts.before.insert(function (userId, post) {
  post.askedAt = new Date();
  post.askedBy = userId;
  post.upVotes = 0;
  post.downVotes = 0;
  if(Meteor.isServer && !post.answer) Meteor.call("notifyAdmin");
});

Posts.before.update(function (userId, post) {
  post.updatedAt = new Date();
  if(!post.answer){
    post.answeredAt = new Date();
    post.answeredBy = userId;
    if(Meteor.isServer) Meteor.call("notifyUser",post.askedBy);
  }
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Posts.search = function(query,topicId) {
  if (!query || !topicId) {
    return;
  }

  return Posts.find({
    topicId: topicId,
    title: { $regex: RegExp.escape(query), $options: 'i' },
    answer: { $exists: true }
  },{
    limit: 50,
    fields: {title:1,askedAt:1,answer:1,topicId:1}
  }
  );
};

Posts.getNotifications = function(userId){
  var user = Meteor.users.findOne({_id: userId});
  if(!user){
    return Posts.find({_id: ''}); // will return an empty cursor
  }
  else if(user.role == 'admin'){
    return Posts._getAdminNotifications();
  }
  else {
    return Posts._getUserNotifications(userId);
  }
};

Posts._getUserNotifications = function(userId){
  return Posts.find(
  {
    askedBy: userId,
    answer: { $exists: true },
    read: false
  },
  {
    sort: { updatedAt: -1 }
  });
};

Posts._getAdminNotifications = function(){
  return Posts.find(
  {
    answer: { $exists: false }
  },
  {
    sort: { askedAt: 1 }
  });
};

Posts.getHeadlines = function(topicId) {
  return Posts.find(
  {
    topicId: topicId,
    answer: { $exists: true }
  },
  {
    sort: { askedAt: -1 },
    fields: {title:1,askedAt:1}
  });
};


Posts.helpers({});

Posts.attachSchema(new SimpleSchema({
  topicId: {
    type: String,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  title: {
    type: String
  },
  question: {
    type: String
  },
  answer: {
    type: String,
    optional: true
  },
  pic: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  askedAt: {
    type: Date,
    optional: true
  },
  askedBy: {
    type: String,
    optional: true
  },
  answeredAt: {
    type: Date,
    optional: true
  },
  answeredBy: {
    type: String,
    optional: true
  },
  read: {
    type: Boolean,
    defaultValue: false
  },
  upVotes: {
    type: Number,
    defaultValue: 0
  },
  downVotes: {
    type: Number,
    defaultValue: 0
  }
}));