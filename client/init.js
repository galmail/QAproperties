Meteor.startup(function () {
  
  AutoForm.setDefaultTemplate('ionic');

  if (Meteor.isCordova) {

  	Push.debug = true;

  	Push.addListener('message', function(notification) {
			// Called on every message
			console.log('received msg',notification);

			// SCENARIO 1: someone ask a question, the admin gets a notification, when clicked, he can see the question (post) and answer it.
			// SCENARIO 2: the admin answer a question, the user gets a push notification, when clicked, he can see the answer (post)
			
			if(notification.background){
				// received notification in the background..
				if(notification.payload && notification.payload.postId)
					Router.go('/posts/' + notification.payload.postId);
				else {
					Router.go('/notifications');
				}
			}
			else {
				// received notification in the foreground.. just alert the user.
				alert('You have received a new message. Check out your notifications.');
			}

		});

  }

});