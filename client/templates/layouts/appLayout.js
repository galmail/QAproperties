Template.appLayout.created = function () {

};

Template.appLayout.rendered = function () {
  //Session.set('currentTab', 'trending');
};

Template.appLayout.helpers({

});

Template.appLayout.events({

	'click [data-action="share-post"]': function (event, template) {
    var msg = Posts.findOne({_id: Router.current().params._id}).title;
    var link = 'http://qaproperties.meteor.com/posts/' + Router.current().params._id;
    if(window.plugins && window.plugins.socialsharing){
      window.plugins.socialsharing.share(msg, null, null, link);
    }
    else {
      alert('Share is not supported on this device');
    }
  }
  
});
