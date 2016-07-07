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
	// console.log(Meteor.user().profile.testActive);
	
	// console.log(user.profile);
	// Tracker.autorun(function () {
	// 	var user = Meteor.user();
	// 	if(user && user.profile) {
	// 		console.log(user.profile.testActive);
	// 		if(user.profile.testActive) {
	// 			var currentStory = user.profile.currentStory;
	// 			var test = Tests.find().fetch()[0];
	// 			if(test.testusers) {
	// 				var order;
	// 				for(var i in test.testusers) {
	// 					if(test.testusers[i].id === user.id) {
	// 						var order = test.testusers[i].order
	// 					}
	// 				}
	// 				var storyId = order[currentStory].id
	// 				FlowRouter.go('/tests/' + storyId)
	// 			}
	// 				// console.log(Meteor.user().profile.orderChapter[currentStory].id)
	// 				// var currentStoryId = Meteor.user().profile.orderChapter[Meteor.user().profile.currentStory].id;
					
					
	// 				// if(!(window.location.href.indexOf('test/done'))) {
	// 				// console.log('doe dit')
					
	// 				// }
	// 				// else {
	// 				// console.log('dat');
					
	// 				// FlowRouter.go('/test/' + currentStoryId)
					
					
					
	// 				// } 
	// 		}
	// 	}
	// })
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