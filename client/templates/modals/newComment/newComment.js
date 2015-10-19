AutoForm.hooks({
  'comments-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      if(Meteor.isCordova && !Push.token){
        IonModal.open('acceptPushNotifications');
      }
    }
  }
});
