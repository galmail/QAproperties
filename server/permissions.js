
Topics.allow({
  'insert': function(userId, doc) {
    return false;
  },
  'update': function(userId, doc, fields, modifier) {
    return false;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Posts.allow({
  // anyone can create a new post
  'insert': function(userId, doc) {
    return true;
  },
  //TODO only the one who asked or the expert can update
  'update': function(userId, doc, fields, modifier) {
    return true;
  },
  // for now, we cannot delete posts
  'remove': function(userId, doc) {
    return false;
  }
});

Comments.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});
