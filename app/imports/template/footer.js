import { Chapters, Dataset, Tests } from '../lib/collections.js';

Template.testfooter.helpers({
	usercurrent() {

		return Meteor.user().profile.currentStory;
	},
	testcurrent() {

		return Tests.find().fetch()[0].testusers[0].currentStory
	},
	max() {
		return Tests.find().fetch()[0].numberOfChapters
	}
})

Template.testfooter.events({
	'click button' : function (e) {
		e.preventDefault();
		
		var profile = Meteor.user().profile;
		if(profile.currentStory < (profile.orderChapter.length - 1)) {
			console.log('ken gewoon!')
			var id = new Meteor.Collection.ObjectID('575805a3a16c63aebdcf8576');
			
			Meteor.call('userTest_currentStory', Meteor.userId(), (profile.currentStory + 1));
			Meteor.call('userTest_currentStory_test', id, Meteor.userId(), (profile.currentStory + 1));
			
			// userTest_currentStory
		}
		else {
			var id = new Meteor.Collection.ObjectID('575805a3a16c63aebdcf8576');
			var number = 0;
				Meteor.call('startTest_user', Meteor.userId(), false, number)
				Meteor.call('startTest_test', id, Meteor.userId(), false, number)
			FlowRouter.go('/test/done')
			
		}
	}
})

Template.test_done.onRendered(function(){
	

})