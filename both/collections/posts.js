Posts = new Mongo.Collection('posts');

///////////////// Utils /////////////////

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


///////////////// Utils End /////////////////

Posts.before.insert(function (userId, post) {
  if(post.askedAt==null) post.askedAt = new Date();
  if(post.askedBy==null){
    post.askedBy = userId;
    post.askedByUsername = Meteor.user().profile.first_name;
  }
  post.upVotes = 0;
  post.downVotes = 0;
  if(post.title) post.title = post.title.capitalize();
  if(post.question) post.question = post.question.capitalize();
  if(post.answer) post.answer = post.answer.capitalize();
});

Posts.before.update(function (userId, post) {
  post.updatedAt = new Date();
  if(post.title) post.title = post.title.capitalize();
  if(post.question) post.question = post.question.capitalize();
  if(post.answer) post.answer = post.answer.capitalize();

  if(!post.answer){
    post.answeredAt = new Date();
    post.answeredBy = userId;
  }
});

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
    fields: {title:1,askedAt:1,askedByUsername:1}
  });
};


Posts.helpers({

  path: function(){
    return "/posts/" + this._id;
  },
  askedAt_TimeAgo: function(){
    return moment(this.askedAt).fromNow();
  }

});

Posts.attachSchema(new SimpleSchema({
  topicId: {
    type: String,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  title: {
    type: String,
    max: 160,
    autoform: {
      label: 'Question',
      rows: 5,
      'label-type': 'placeholder',
      placeholder: 'Type your question here…'
    }
  },
  question: {
    type: String,
    optional: true
  },
  answer: {
    type: String,
    optional: true,
    autoform: {
      label: 'Answer',
      rows: 10,
      'label-type': 'placeholder',
      placeholder: 'Type your answer here…'
    }
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
  askedByUsername: {
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