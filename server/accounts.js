// accounts.js

Accounts.onCreateUser(function(options, user) {
  // setting user profile

  if(user.services && user.services.facebook){
    user.profile = user.services.facebook;
    if(user.services.facebook.first_name==null){
      user.profile.first_name = user.services.facebook.name.split(' ')[0];
    }
    if(user.services.facebook.email==null){
      user.profile.email = "fb_" + user.services.facebook.id + "@qaproperties.co.uk";
    }
  }
  else if(user.services && user.services.twitter){
    user.profile = user.services.twitter;
    user.profile.first_name = '@' + user.services.twitter.screenName;
    if(user.services.twitter.email==null){
      user.profile.email = "tw_" + user.services.twitter.screenName + "@qaproperties.co.uk";
    }
  }
  else {
    user.profile = { first_name: 'Guest' };
  }

  // setting user role
  if(user.role==null) user.role = 'user';
  user.upVotedPosts = [];
  user.downVotedPosts = [];
  return user;
});


