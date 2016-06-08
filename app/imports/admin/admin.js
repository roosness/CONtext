import { Chapters, Dataset, Tests } from '../lib/collections.js';
Template.admin.onCreated(function () {
	var self = this;
	Session.set('selectedTab', 'setupTest');
	Session.set('amountOfChapters', 0)
	self.autorun(function () {
		self.subscribe('getUserData');
		self.subscribe('Tests');
		self.subscribe('Chapters')
		self.subscribe('userList')
	})
})
