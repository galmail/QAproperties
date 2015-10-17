Template.newQuestion.helpers({
  topicId: function () {
    return Router.current().params._id;
  }
});

AutoForm.hooks({
  'question-new-form': {
    onSuccess: function (operation, result, template) {
      IonKeyboard.close();
      IonModal.close();
      IonPopup.show({
        title: 'Thank you!',
        template: 'Your question has been submitted! You will get notification on response.',
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
    }
  }
});
