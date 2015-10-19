// acceptPushNotifications.js

Template.acceptPushNotifications.helpers({});

Template.acceptPushNotifications.events({

	'click .button.continue': function(){
		var self = this;
		
		Push.Configure({});

		Push.addListener('token', function(token) {
			console.log('got token',token);
			alert('Push-Notifications Configured!');
		  IonModal.close('acceptPushNotifications');
		  if(self.callback) self.callback();
		});
	}

});
