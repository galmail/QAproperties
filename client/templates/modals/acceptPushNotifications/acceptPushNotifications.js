// acceptPushNotifications.js

Template.acceptPushNotifications.helpers({});

Template.acceptPushNotifications.events({

	'click .button.continue': function(){
		var self = this;
		
		IonLoading.show();

		Push.Configure({});

		Push.addListener('token', function(token) {
			console.log('got token',token);
			IonLoading.hide();
			alert('Push-Notifications Configured!');
		  IonModal.close('acceptPushNotifications');
		  if(self.callback) self.callback();
		});
	}

});
