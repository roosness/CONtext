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
	},
	uniqueChapters() {
		return Chapters.find({duplicateFrom:false}, {sort: {date: -1}})
	},
	hasDuplicates() {
		console.log(this)
		return this.duplicated
	},
	duplicate () {
		return this.duplicatedStories
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
			duplicated: false,
			duplicatedStories: [],
			duplicateFrom: false,
			duplicateTitle: false
		})
	},
	'click .delete' : function (e) {
		e.preventDefault();
		console.log(e.currentTarget)
		if(e.currentTarget.classList.contains('original')) {
			console.log('true')
			var duplicatedStories = Chapters.find(e.currentTarget.id).fetch()[0].duplicatedStories;
			console.log(duplicatedStories)
			for(var i = 0; i < duplicatedStories.length; i++) {
				console.log('remove!')
				console.log(duplicatedStories[i].id)
				Chapters.remove(duplicatedStories[i].id);


			}
			Chapters.remove(e.currentTarget.id)
		} else {
			
			var ownId= e.currentTarget.id.split(',')[0]
			var parentId = e.currentTarget.id.split(',')[1];
			Chapters.update(parentId, {
				$pull: {
					duplicatedStories: {id: ownId}
				}
			})
			Chapters.remove(ownId)
		}
		console.log(e.currentTarget.id);
		// Chapters.remove(e.currentTarget.id)
	}
})
