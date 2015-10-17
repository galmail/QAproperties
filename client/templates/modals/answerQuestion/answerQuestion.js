Template.answerQuestion.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('viewPost', Session.get('postId'));
  }.bind(this));
};

Template.answerQuestion.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.answerQuestion.helpers({
  currentPost: function(){
    return Posts.findOne({_id: Session.get('postId')});
  }
});

AutoForm.hooks({
  'answer-question-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
    }
  }
});
