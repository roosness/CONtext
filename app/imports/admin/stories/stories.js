import { Chapters, Dataset } from '../../lib/collections.js';
Template.adminStories.onRendered (function(){
	
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
			useName: false,
			useGender: false,
			name : {
				for: '',
				format: ''
			},
			gender : {
				for: '',
				reversed: '',
			}
		}
		Chapters.insert({
			number: (Chapters.find({}).count() )+ 1,
			title: event.target.title.value.trim(),
			date: new Date(),
			content: [],
			settings: settings,
		})
	}
})