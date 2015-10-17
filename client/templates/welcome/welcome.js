// welcome.js

Template.welcome.created = function () {};

Template.welcome.rendered = function () {};

Template.welcome.helpers({

  opts: function() {
    var opts ={
      facebook: true,
      twitter: true,
      pinterest: false,
      shareData: {
        url: 'http://tocarta.com/',
        text: 'this is a text'
      }
    };
    return opts;
  }

});

Template.welcome.events({

	'click [data-action=view-terms]': function(){
		IonModal.open('terms');
	}

});
