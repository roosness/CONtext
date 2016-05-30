BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'start',
  
  action() {

    BlazeLayout.render( 'layout', {overlay: 'start'});
  }
});
FlowRouter.route('/stories', {
  name: 'stories',
  subscriptions () {
    this.register('Chapters', Meteor.subscribe('Chapters'));
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
FlowRouter.route('/admin', {
  name: 'admin',
  subscriptions () {
  	this.register('Chapters', Meteor.subscribe('Chapters'));
    this.register('Dataset', Meteor.subscribe('Dataset'));
  },
  action() {

    BlazeLayout.render('layout', {header: 'header', main: 'admin'});
  }
});
FlowRouter.route('/admin/:chapterId', {
  name: 'adminChapter',
  subscriptions () {
    this.register('Chapters', Meteor.subscribe('Chapters'))
    this.register('Dataset', Meteor.subscribe('Dataset'))
  },
  action() {

    BlazeLayout.render('layout', {header: 'header',main: 'adminChapter'});
  }
});