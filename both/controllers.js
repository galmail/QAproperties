AppController = RouteController.extend({
  layoutTemplate: 'appLayout'
});

WelcomeController = RouteController.extend({
	layoutTemplate: 'clearLayout'
});

AboutController = AppController.extend({});

TopicsController = AppController.extend({});

PostController = AppController.extend({});

HeadlinesController = AppController.extend({});

/////////// Old Controllers //////////

TrendingController = AppController.extend({});

RecentController = AppController.extend({});

ProductsShowController = AppController.extend({});

UsersShowController = AppController.extend({});

NotificationsController = AppController.extend({});

ProfileController = AppController.extend({});

