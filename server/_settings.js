Meteor.startup(function() {

	if (typeof Meteor.settings === 'undefined')
	  Meteor.settings = {};

	// by default get the dev settings if settings is not configured
	_.defaults(Meteor.settings, JSON.parse(Assets.getText('settings.dev.json')));

	///// Setting Up the Logger ///////
	Logger = new Loggly({
    token: Meteor.settings.loggly.token,
    subdomain: "gal",
    auth: {
      username: Meteor.settings.loggly.username,
      password: Meteor.settings.loggly.password
    },
    //
    // Optional: Tag to send with EVERY log message
    //
    tags: ['global-tag'],
    // Optional: logs will be stored in JSON format
    json: true
  });

  if(Meteor.settings.loggly.production && Logger) {
  	console.log = function(){
  		return Logger.log(arguments);
  	};
  	console.warn = function(){
  		return Logger.log(arguments);
  	};
  }

  console.log("Server Started Logging using console.log");

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

	Push.debug = true;

	Push.Configure({
	  apn: {
	    passphrase: Meteor.settings.pushNotifications.apn.passphrase,
	    certData: Assets.getText(Meteor.settings.pushNotifications.apn.cert),
	    keyData: Assets.getText(Meteor.settings.pushNotifications.apn.key),
	    gateway: Meteor.settings.pushNotifications.apn.gateway
	  },
	  production: Meteor.settings.pushNotifications.production,
	  badge: Meteor.settings.pushNotifications.badge,
	  sound: Meteor.settings.pushNotifications.sound,
	  alert: Meteor.settings.pushNotifications.alert,
	  vibrate: Meteor.settings.pushNotifications.vibrate
	});

});
