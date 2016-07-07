import { Tests } from '../../lib/collections.js';
import {watcher} from '../../client/layouts/reader-layout.js'
import './testStory.html'

Template.testStory.onCreated(function () {
	var self = this;
	
	self.autorun(function () {
		self.subscribe('Tests', {
			onReady: function () {
				watcher();	
			}
		});
	})
})

Template.testStory.events({
	'click a': function (e) {
		e.preventDefault();
		var number = Meteor.user().profile.currentStory + 1;
		var user = Meteor.user();
		var test = Tests.find().fetch()[0];
		if(user && test) {
			if(number === test.numberOfChapters) {
				Meteor.call('finish_test', Meteor.userId(), test._id)
				FlowRouter.go('/tests/done');
			} else {

					Meteor.call('current_story_update', number, user._id, test._id);
			}
		}
		
		
		
		
	}
})

