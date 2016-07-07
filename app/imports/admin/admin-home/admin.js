import { Stories } from '../../../lib/collections.js';

import './admin.html'

Template.admin.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('Stories');
	})
})

Template.admin.helpers({
	hasStories() {
		return Stories.find().count() > 0
	},
	username() {
		return Meteor.user().profile.name
	},
	uniqueStories() {
		
		return Stories.find()
	},
	hasDuplicates() {
		
		return this.duplicated.isDuplicated
	},
	duplicate () {
		return this.duplicated.duplicatedStories
	},
	isSingle() {
		
		return !this.duplicated.duplicateFrom
	}
})

Template.admin.events({
	'submit .newChapter': function (e) {
		e.preventDefault();
		var title = e.currentTarget.title.value.trim();
		if(!(title === '')) {
			Meteor.call('stories_insert', false, title);
			e.currentTarget.reset();
		}
	},
	'click .delete' : function (e) {
		console.log('delete!')
		e.preventDefault();
		if(e.currentTarget.classList.contains('original')) {
			var duplicatedStories = Stories.find(e.currentTarget.id).fetch()[0].duplicated.duplicatedStories;

			for(var i = 0; i < duplicatedStories.length; i++) {
				Meteor.call('stories_remove', duplicatedStories[i].id)
			}
			Meteor.call('stories_remove', e.currentTarget.id)
		} else {
			Meteor.call('stories_duplicates_remove', e.currentTarget.id)	
		}
		
	}
})