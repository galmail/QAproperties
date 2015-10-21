Template.newQuestion.helpers({
  topicId: function () {
    return Router.current().params._id;
  }
});

AutoForm.hooks({
  questionNewForm: {
    onSuccess: function (operation, result, template) {
      IonKeyboard.close();
      IonModal.close();
      Meteor.call("notifyAdmin",result);

      IonPopup.show({
        title: 'Thank you!',
        template: "Your question has been submitted! You will get a push-notification upon response.",
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function() {
              IonPopup.close();
              if(Meteor.isCordova && !Push.token){
                IonModal.open('acceptPushNotifications');
              }
              return true;
            }
          }
        ]
      });
    }
  }
});
