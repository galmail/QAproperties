// about.js

Template.about.created = function () {
	if(Meteor.isCordova && Session.get("AppVersion")==null){
		cordova.getAppVersion.getVersionNumber(function (version) {
			Session.set("AppVersion",version);
		});
	}
};

Template.about.rendered = function () {};

Template.about.helpers({

	version: function(){
		return Session.get("AppVersion");
	}

});

Template.about.events({});
