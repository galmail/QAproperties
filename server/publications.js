Meteor.publish('user', function(_id) {
  return Meteor.users.find({_id: _id});
});

Meteor.publish('topics', function() {
  return Topics.find();
});

Meteor.publish('headlines', function(topicId) {
  return Posts.find(
  {
    topicId: topicId,
    answer: { $exists: true }
  },
  {
    sort: { askedAt: -1 },
    fields: {title:1,askedAt:1,topicId:1,answer:1}
  });
});

Meteor.publish('headlinesSearch', function(query,topicId) {
  //check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Posts.search(query,topicId);
});

Meteor.publish('viewPost', function(postId) {
  return Posts.find({_id: postId});
});

Meteor.publish('viewPostComments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(userId) {
  return Posts.getNotifications(userId);
});

