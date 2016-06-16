
BlazeLayout.setRoot('body');


var exposed = FlowRouter.group({
  triggersEnter: [
  function () {
    console.log('exposed');
    var route ;

    console.log(Meteor.loggingIn())
   if (!(Meteor.loggingIn() || Meteor.userId())) {

        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('login');
      }
      else {
        FlowRouter.go('stories')
      }

  }]
});
var loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      Meteor.subscribe('getUserData');
      Meteor.subscribe('Userdata');
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

var test = loggedIn.group({
  name: 'test',
  prefix: '/test'

})

test.route('/done', {
  name: 'test',
  action() {
    BlazeLayout.render('layout', {main: 'test_done'})
  }
})
test.route('/:id', {
  name: 'test',
  action() {
    BlazeLayout.render('layout', {main: 'story', footer: 'testfooter'})
  }
})
var adminRouters = FlowRouter.group({
  prefix:'/admin',
  name: 'admin',
})
exposed.route('/', {
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
