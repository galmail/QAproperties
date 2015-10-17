
Tracker.autorun(function() {
  if (Session.get('searchQuery')) {
    Meteor.subscribe('headlinesSearch', Session.get('searchQuery'),Router.current().params._id);
  }
});

Template.search.events({
  'keyup input': function (event, template) {
    Session.set('searchQuery', event.target.value);
  },
  'click .item': function (event, template) {
    if(event.target.placeholder || event.target.className=='item-input-inset' || event.target.className=='item-input-wrapper'){
      // ignore the search...
      return true;
    }
    Session.set('postId',this._id);
    IonModal.close('search');
    Session.set('searchQuery','');
    IonModal.open('post');
    return false;
  }
});

Template.search.helpers({
  headlines: function() {
    return Posts.search(Session.get('searchQuery'),Router.current().params._id);
  },
  searchQuery: function() {
    return Session.get('searchQuery');
  }
});


