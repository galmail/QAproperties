// Router.route('/', {
//   name: 'home'
// });

Router.route('/', function () {
  Router.go('topics');
});

Router.route('/welcome', {
  name: 'welcome'
});

Router.route('/about', {
  name: 'about'
});

Router.route('/topics', {
  name: 'topics'
});

Router.route('/headlines/:_id', {
  name: 'headlines'
});

Router.route('/notifications', {
  name: 'notifications'
});

Router.route('/profile', {
  name: 'profile'
});

////////// OLD ROUTES //////////

Router.route('/recent', {
  name: 'recent'
});

Router.route('/products/:_id', {
  name: 'products.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});
