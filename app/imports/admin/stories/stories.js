import { Chapters, Dataset } from '../../lib/collections.js';
Template.adminStories.onCreated (function(){
	var self = this;

	self.autorun(function () {
		self.subscribe('Chapters')
	})
})
Template.adminStories.helpers ({
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	}
})
Template.adminStories.events({
	'submit .newChapter' : function (event) {
		event.preventDefault();
		console.log((Chapters.find({}).count() )+ 1);
		var settings = {
			forTests : false,
			nameFormat: '',
			genderReversed: false
		}
		Chapters.insert({
			number: (Chapters.find({}).count() )+ 1,
			title: event.target.title.value.trim(),
			date: new Date(),
			content: [],
			settings: settings,
			usedData: [],
		})
	},
	'click .delete' : function (e) {
		e.preventDefault();
		console.log(e.currentTarget.id);
		Chapters.remove(e.currentTarget.id)
	}
})