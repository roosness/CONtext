import { Tests } from '../lib/collections.js';
Template.layout.onCreated(function () {
	var self = this;
	
	
	self.autorun(function () {
		self.subscribe('Tests', {
			onReady: function () { watchTester() }
		});
		
	})
})
var watchTester = function () {
	Tracker.autorun(function (c) {
		if(Meteor.user().profile.testActive === true) {
			console.log('bezig')
			var currentStory = Meteor.user().profile.currentStory;
			console.log(currentStory)
			console.log(Meteor.user().profile.orderChapter[currentStory].id)
			var currentStoryId = Meteor.user().profile.orderChapter[Meteor.user().profile.currentStory].id;
			
			
			if(!(window.location.href.indexOf('test/done'))) {
				console.log('doe dit')
				
			}
			else {
				console.log('dat');
				
					FlowRouter.go('/test/' + currentStoryId)
				
				
					
			} 
			
		}

		// c.stop();
	  
	});

}


Template.layout.helpers({
	isAdmin() {
		
		if(FlowRouter.current().route.group) {
			if(FlowRouter.current().route.group.name === 'admin') {
				return 'admin'
			}
			
		}
		else {
			return'bla'
		}
		
	}
})