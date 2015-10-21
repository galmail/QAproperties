// accounts.js

Accounts.onCreateUser(function(options, user) {
  // setting user profile
  if(user.services && user.services.facebook){
    user.profile = user.services.facebook;
  }
  else if(user.services && user.services.twitter){
    user.profile = user.services.twitter;
    user.profile.first_name = '@' + user.services.twitter.screenName;
  }
  else if (options.profile)
    user.profile = options.profile;
  else {
    user.profile = { first_name: 'Guest' };
  }
  // setting user role
  if(user.role==null) user.role = 'user';
  //if(Meteor.users.find({}).count()==0) user.role = 'admin';
  user.upVotedPosts = [];
  user.downVotedPosts = [];
  return user;
});
