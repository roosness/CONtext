import '../../imports/stories/stories.js'
import '../../imports/stories/story.js'
import '../../imports/stories/testStory.js'
import '../../imports/login/login.js'
import '../../imports/user/user.js'
import '../../imports/admin/admin-home/admin.js'
import '../../imports/admin/admin-home/admin-story/admin-story.js'
import '../../imports/admin/admin-home/admin-story/admin-story-filters.js'
import '../../imports/admin/admin-home/admin-story/admin-story-settings.js'
import '../../imports/admin/admin-home/admin-story/admin-story-editing.js'
import '../../imports/admin/admin-settings/admin-settings.js'
import '../../imports/admin/admin-tests/admin-tests.js'


BlazeLayout.setRoot('body');

FlowRouter.notFound = {
    action: function() {
    	console.log('not found')
    }
};

var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin',
	triggersEnter: [
		function () {
			if (!(Meteor.user() || Meteor.userId())) {
		        FlowRouter.redirect('/login')
		      } else {
		        console.log('logged in!');
		      }
	}]
})

var publicRoutes = FlowRouter.group({
	triggersEnter:[
	function () {
		console.log('running public routergroup')
	}
	]
})

var readerRoutes  = FlowRouter.group({
	triggersEnter:[
	function () {
		console.log('running reader routergroup')
	},
	function () {
		if (!(Meteor.user() || Meteor.userId())) {
	        FlowRouter.redirect('/login')
	      } else {
	        console.log('logged in!')
	      }
	}
	]
})

publicRoutes.route('/login', {
	action() {
		BlazeLayout.render('login')
	}
})
readerRoutes.route('/', {
	action() {
		BlazeLayout.render('readerLayout', {main: 'stories'})
	}
})
readerRoutes.route('/stories/:id', {
	action() {
		BlazeLayout.render('readerLayout', {main: 'story'})
	}
})
readerRoutes.route('/tests/done', {
	action() {
		BlazeLayout.render('testDone')
	}
})

readerRoutes.route('/tests/:id', {
	action() {
		BlazeLayout.render('testStory')
	}
})
readerRoutes.route('/user', {
	action() {
		BlazeLayout.render('readerLayout', {main: 'user'})
	}
})

adminRoutes.route('/', {
	name: 'admin-home',
	action () {
		BlazeLayout.render('adminLayout', {main: 'admin'})
	}
})
adminRoutes.route('/settings', {
	name: 'admin-settings',
	action () {
		BlazeLayout.render('adminLayout', {main: 'adminSettings'})
	}
})
adminRoutes.route('/tests', {
	name: 'admin-tests',
	action () {
		BlazeLayout.render('adminLayout', {main: 'adminTests'})
	}
})
adminRoutes.route('/:id', {
	name: 'admin-story-detail',
	action () {
		BlazeLayout.render('adminLayout', {main: 'adminStory'})
	}
})
