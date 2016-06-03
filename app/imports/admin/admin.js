import { Chapters, Dataset } from '../lib/collections.js';
Template.admin.onRendered (function(){
	
})
Template.admin.helpers ({
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	}
})
Template.admin.events({
	'submit .newChapter' : function (event) {
		event.preventDefault();
		console.log((Chapters.find({}).count() )+ 1)
		Chapters.insert({
			number: (Chapters.find({}).count() )+ 1,
			title: event.target.title.value.trim(),
			date: new Date(),
			content: []
		})
	}
})