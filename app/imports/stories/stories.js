import { Stories } from '../../lib/collections.js';

import './stories.html'

Template.stories.onCreated(function () {
	console.log('created')
})

Template.stories.onCreated(function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('Stories');
	})
})

Template.stories.helpers({
	stories() {
		return Stories.find().fetch()
	}
})