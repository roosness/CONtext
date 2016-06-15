BlazeLayout.setRoot('body');

var exposed = FlowRouter.group({
 
});
var loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('login');
      }
    }
  ]
})
var admin = loggedIn.group({
  name:'admin',
  prefix:'/admin',
    triggersEnter: [
      function () {
        if(!(Roles.userIsInRole || Meteor.user() : ['admin']))
          FlowRouter.go('/admin')
      }
    ]
})


var adminRouters = FlowRouter.group({
  prefix:'/admin',
  name: 'admin',
})
loggedIn.route('/', {
  name: 'start',
  action() {
    BlazeLayout.render( 'layout', {overlay: 'start'});
  }
});
exposed.route('/login', {
  name:'login',
  action() {
    BlazeLayout.render( 'layout', {overlay: 'start'});
  }
})
loggedIn.route('/user', {
  name: 'user',
  action() {
    BlazeLayout.render( 'layout', {main: 'user', header: 'header'});
  }
});
loggedIn.route('/stories', {
  name: 'stories',
  action() {
    BlazeLayout.render( 'layout', {header: 'header', main: 'stories'});
  }
});
loggedIn.route('/stories/:id', {
  name: 'story',
  action() {
    BlazeLayout.render( 'layout', {header: 'header', main: 'story'});
  }
});
admin.route('/', {
  name: 'admin',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin'});
  }
})
admin.route('/settings', {
  name: 'admin-settings',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin-settings'});
  }
})
admin.route('/stats', {
  name: 'admin-stats',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin-stats'});
  }
})
admin.route('/stories', {
  name: 'admin-stories',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'adminStories'});
  }
})
admin.route('/stories/:id', {
  name: 'admin',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'adminStory'});
  }
})
