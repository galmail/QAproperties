// user.js

Meteor.users.before.insert(function (userId, doc) {
  doc.upVotedPosts = [];
  doc.downVotedPosts = [];
});


Meteor.users.helpers({
	
});
