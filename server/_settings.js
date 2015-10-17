Meteor.startup(function() {

	if (typeof Meteor.settings === 'undefined')
	  Meteor.settings = {};

	// by default get the dev settings
	_.defaults(Meteor.settings, JSON.parse(Assets.getText('settings.dev.json')));

	///// Login with Twitter ///////

	ServiceConfiguration.configurations.remove({
	  service: 'twitter'
	});
	 
	ServiceConfiguration.configurations.insert({
	  service: 'twitter',
	  consumerKey: Meteor.settings.twitter.consumerKey,
	  secret: Meteor.settings.twitter.secret
	});

	/////// Login with Facebook ///////

	ServiceConfiguration.configurations.remove({
	  service: 'facebook'
	});
	 
	ServiceConfiguration.configurations.insert({
	  service: 'facebook',
	  appId: Meteor.settings.facebook.appId,
	  secret: Meteor.settings.facebook.secret
	});

});
