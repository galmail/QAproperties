Meteor.startup(function() {

  var randomDate = function(){
    return new Date(new Date(2015, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2015, 0, 1).getTime()));
  };

  var topics = [
    {
      name: 'Rent',
      thumbnail: 'images/topics/rent.png'
    },
    {
      name: 'Buy/Sell',
      thumbnail: 'images/topics/buy_sell.png'
    },
    {
      name: 'Tenant',
      thumbnail: 'images/topics/tenants.png'
    },
    {
      name: 'Landlord',
      thumbnail: 'images/topics/landlords.png'
    },
    {
      name: 'Investor',
      thumbnail: 'images/topics/investors.png'
    },
    {
      name: 'Agent',
      thumbnail: 'images/topics/agents.png'
    }
  ];

  var posts = [
    {
      topic: 'Rent',
      title: 'This is title1',
      question: 'This is question1',
      answer: 'This is answer1'
    },
    {
      topic: 'Rent',
      title: 'This is title2',
      question: 'This is question2',
      answer: 'This is answer2'
    },
    {
      topic: 'Rent',
      title: 'This is title3',
      question: 'This is question3',
      answer: 'This is answer3'
    },
    {
      topic: 'Buy/Sell',
      title: 'This is title4',
      question: 'This is question4',
      answer: 'This is answer4'
    },
    {
      topic: 'Buy/Sell',
      title: 'This is title5',
      question: 'This is question5',
      answer: 'This is answer5'
    }
  ];

  ///////////// Inserting Stuff /////////////
  
  //Topics.remove({});
  if (Topics.find({}).count() === 0) {
    _(topics).each(function (topic) {
      Topics.insert(topic);
    });
  }

  //Posts.remove({});
  if (Posts.find({}).count() === 0) {
    var randUser = Meteor.users.findOne();
    var randPic = 'http://pcimplements.com/koenigins/wp-content/uploads/2014/03/home.jpg';
    _(posts).each(function (post) {
      post.topicId = Topics.findOne({name: post.topic})._id;
      post.askedAt = randomDate();
      //post.askedBy = randUser._id;
      post.pic = randPic;
      Posts.insert(post);
    });
  }

});




