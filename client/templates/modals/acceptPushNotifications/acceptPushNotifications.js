// acceptPushNotifications.js

Template.acceptPushNotifications.helpers({});

Template.acceptPushNotifications.events({

	'click .button.continue': function(){
		var self = this;
		IonLoading.show();
		Push.Configure({});
		Meteor.setTimeout(function(){
			IonLoading.hide();
			//alert('Push-Notifications Configured!');
		  IonModal.close('acceptPushNotifications');
		  if(self.callback) self.callback();
		},5000);
	}

});
