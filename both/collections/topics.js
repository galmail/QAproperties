Topics = new Mongo.Collection('topics');

Topics.helpers({});

Topics.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  thumbnail: {
    type: String
  },
  position: {
    type: Number
  }
}));
