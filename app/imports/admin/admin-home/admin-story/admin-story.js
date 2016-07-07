import { Stories, userData, Fallbacks } from '../../../../lib/collections.js';
import './admin-story.html'
Template.adminStory.onCreated(function () {
	var self = this;
	Session.set('selectedAside', 'filters')
	self.autorun(function () {
		console.log(FlowRouter.getParam('id'))
		self.subscribe('singleStory', FlowRouter.getParam('id'));
		self.subscribe('userData', Meteor.userId());
	});
});

Template.adminStory.helpers({
	whichOne() {
		return Session.get('selectedAside')
	},
	tabname() {
		if(Session.get('selectedAside') === 'filters') {
			return 'instellingen'
		} else {
			return 'filters'
		}
	}
})
Template.adminStory.events({
	'click #switch' :function (e) {
		e.preventDefault()
		if(Session.get('selectedAside') === 'filters') {
			Session.set('selectedAside', 'storySettings')
		} else {
			Session.set('selectedAside', 'filters')
		}
	}
})
