Meteor.startup(function () {

	//////////// AutoForm ////////////
  
  AutoForm.setDefaultTemplate('ionic');

  //////////// Avatar ////////////

  Avatar.setOptions({
	  defaultImageUrl: "/images/user.png"
	});

	Avatar.setOptions({
	  customImageProperty: function() {
	  	if(this.profile.profile_image_url){
	  		return this.profile.profile_image_url;
	  	}
	  	else if(this.profile.id){
	  		return "https://graph.facebook.com/"+this.profile.id+"/picture/?type=large";
	  	}
	  	else {
	  		return null;
	  	}
	  }
	});

	//////////// Alert & Open Window ////////////

	window.alert = function(msg){
		IonPopup.show({
      title: msg,
      template: '',
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function() {
            IonPopup.close();
            return true;
          }
        }
      ]
    });
	};

	if (Meteor.isCordova) {
		window.open = function(link){
			cordova.InAppBrowser.open(link, '_blank', 'location=yes');
		};
	}

	//////////// Push Notifications ////////////

  if (Meteor.isCordova) {

  	//Push.debug = true;

  	Push.addListener('token', function(token) {
			console.log('got token',token);
			localStorage.setItem("pushEnabled","yes");
		});

  	Push.addListener('message', function(notification) {
			// Called on every message
			//console.log('received msg',notification);
			
			if(notification.background){
				// received notification in the background..
				if(notification.payload && notification.payload.postId && notification.payload.isComment){
					Router.go('/posts/' + notification.payload.postId);
				}
				else {
					Router.go('/notifications');
				}
			}
			else {
				// received notification in the foreground..
				if(notification.payload && notification.payload.postId && notification.payload.isComment){
					alert('Someone just posted a comment. Click Ok to see it.');
					Router.go('/posts/' + notification.payload.postId);
				}
				else {
					alert('You have received a message! Check out your notifications.');
				}
			}

		});


		if(localStorage.getItem("pushEnabled")=="yes"){
  		Push.Configure({});
  	}











  }

});