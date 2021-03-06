import { Dataset, Chapters, Userdata } from '../lib/collections.js';

BlazeLayout.setRoot('body');
var exposed = FlowRouter.group({
  triggersEnter: [
    function () {
      if (!(Meteor.user() || Meteor.userId())) {
        console.log('not logged in!')
      } else {
        FlowRouter.redirect('/stories')
      }
    }
  ]
})
var loggedIn = FlowRouter.group({
    triggersEnter: [
    function () {
      if (!(Meteor.user() || Meteor.userId())) {
        FlowRouter.redirect('/login')
      } else {
        console.log('logged in!')
      }
    }
    ]
});
var admin = loggedIn.group({
  name:'admin',
  prefix:'/admin',
  triggersEnter: [
    function () {
      if (!(Meteor.user() || Meteor.userId())) {
        FlowRouter.redirect('/login')
      } else {
        console.log('logged in!')
      }
    }
    ]
});


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
    if(Meteor.user()) {
      FlowRouter.go('stories')
    } else {
      BlazeLayout.render( 'layout', {overlay: 'start'});
    }
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
  name: 'admin-stories',
  action() {
    BlazeLayout.render( 'layout', {header: 'header', main: 'stories'});
  }
});
loggedIn.route('/stories/:id', {
  name: 'admin-stories',
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
  name: 'adminSettings',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'adminSettings'});
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
