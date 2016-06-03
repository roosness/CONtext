BlazeLayout.setRoot('body');


var adminRouters = FlowRouter.group({
  prefix:'/admin',
  name: 'admin',
  subscriptions () {
    this.register('Chapters', Meteor.subscribe('Chapters'));
    this.register('Dataset', Meteor.subscribe('Dataset'));
    this.register('getUserData', Meteor.subscribe('getUserData'));
  },
   triggersEnter: [function(context, redirect) {
    
  }]
})

adminRouters.route('/', {
  name: 'admin',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin'});
  }
})
adminRouters.route('/settings', {
  name: 'admin-settings',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin-settings'});
  }
})

adminRouters.route('/stats', {
  name: 'admin-stats',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin-stats'});
  }
})

adminRouters.route('/stories', {
  name: 'admin-stories',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'adminStories'});
  }
})

adminRouters.route('/stories/:chapterId', {
  name: 'admin',
  action() {
    BlazeLayout.render('layout', {header: 'headerAdmin', main: 'adminStory'});
  }
})
// FlowRouter.route('/admin', {
//   name: 'admin',
//   subscriptions () {
//   	this.register('Chapters', Meteor.subscribe('Chapters'));
//     this.register('Dataset', Meteor.subscribe('Dataset'));
//   },
//   action() {

//     BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin'});
//   }
// });
// FlowRouter.route('/admin/settings', {
//   name: 'admin',
//   subscriptions () {
//     this.register('Chapters', Meteor.subscribe('Chapters'));
//     this.register('Dataset', Meteor.subscribe('Dataset'));
//   },
//   action() {

//     BlazeLayout.render('layout', {header: 'headerAdmin', main: 'admin'});
//   }
// });

// FlowRouter.route('/admin/:chapterId', {
//   name: 'adminChapter',
//   subscriptions () {
//     this.register('Chapters', Meteor.subscribe('Chapters'))
//     this.register('Dataset', Meteor.subscribe('Dataset'))
//   },
//   action() {

//     BlazeLayout.render('layout', {header: 'header',main: 'adminChapter'});
//   }
// });



FlowRouter.route('/', {
  name: 'start',
  subscriptions () {
    this.register('getUserData', Meteor.subscribe('getUserData'));
  },
  action() {

    BlazeLayout.render( 'layout', {overlay: 'start'});
  }
});
FlowRouter.route('/user', {
  name: 'start',
  subscriptions () {
    this.register('getUserData', Meteor.subscribe('getUserData'));
  },
  action() {

    BlazeLayout.render( 'layout', {overlay: 'start'});
  }
});

FlowRouter.route('/stories', {
  name: 'stories',
  subscriptions () {
    this.register('Chapters', Meteor.subscribe('Chapters'));
    this.register('getUserData', Meteor.subscribe('getUserData'));
  },
  action() {

    BlazeLayout.render( 'layout', {header: 'header', main: 'stories'});
  }
});
FlowRouter.route('/stories/:chapterId', {
  name: 'story',
  subscriptions () {
    this.register('Dataset', Meteor.subscribe('Dataset'))
    this.register('Chapters', Meteor.subscribe('Chapters'));
  },
  action() {

    BlazeLayout.render( 'layout', {header: 'header', main: 'story'});
  }
});