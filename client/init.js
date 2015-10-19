Meteor.startup(function () {
  
  AutoForm.setDefaultTemplate('ionic');

  if (Meteor.isCordova) {

  	Push.debug = true;

  	Push.addListener('message', function(notification) {
			// Called on every message
			console.log('received msg',notification);
			//console.log(JSON.stringify(notification));
			alert(notification.message, function(){
				console.log("notification dismissed...");
			}, notification.title, "Ok");

			console.log("notification.payload",notification.payload);

			// SCENARIO 1: someone ask a question, the admin gets a notification, when clicked, he can see the question (post) and answer it.
			
			// SCENARIO 2: the admin answer a question, the user gets a push notification, when clicked, he can see the answer (post)
			
			if(notification.payload && notification.payload.postId)
				Router.go('/posts/' + notification.payload.postId);
			else {
				Router.go('/notifications');
			}

		});

  }

});