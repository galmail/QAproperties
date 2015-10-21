Template.answerQuestion.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('viewPost', Router.current().params._id);
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
    return Posts.findOne();
  }
});

AutoForm.hooks({
  answerQuestionForm: {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      IonKeyboard.close();
      var post = Posts.findOne();
      Meteor.call("notifyUser",post.askedBy,post._id);
    }
  }
});
