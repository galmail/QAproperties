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

	/////// Push Notifications ///////

	// Push.Configure({
	//   apn: {
	//     passphrase: Meteor.settings.pushNotifications.apn.passphrase,
	//     certData: Assets.getText(Meteor.settings.pushNotifications.apn.cert),
	//     keyData: Assets.getText(Meteor.settings.pushNotifications.apn.key),
	//   },
	//   production: Meteor.settings.pushNotifications.production,
	//   badge: Meteor.settings.pushNotifications.badge,
	//   sound: Meteor.settings.pushNotifications.sound,
	//   alert: Meteor.settings.pushNotifications.alert,
	//   vibrate: Meteor.settings.pushNotifications.vibrate
	// });

});
