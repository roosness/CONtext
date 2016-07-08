import { Tests } from '../../lib/collections.js';

Template.readerLayout.onRendered(function () {
	console.log('start!');
	var self = this;
	self.autorun(function () {
		self.subscribe('Tests', {
			onReady: function () {
				watcher();	
			}
		});
	})
})

export var watcher = function () {
	console.log('start tracker');
	Tracker.autorun(function () {
		if(Meteor.user().profile.testActive) {
			var testusers = Tests.find().fetch()[0].testusers;
			var order;
			for(var i in testusers) {
				if(testusers[i].userid === Meteor.userId()) {
					order = testusers[i].order;
				}
			}
			FlowRouter.go('/tests/' + order[Meteor.user().profile.currentStory].id)
		}
	})
}