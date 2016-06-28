import { Chapters, Dataset } from '../../lib/collections.js';
Template.stories.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('Chapters')
	})
})

Template.stories.helpers ({
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	}
})
Template.stories.events({
	
})

