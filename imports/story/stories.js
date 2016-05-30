import { Chapters, Dataset } from '../lib/collections.js';

Template.stories.helpers ({
	chapters () {
		console.log(this)
		return Chapters.find({}, {sort: {date: -1}})
	}
})
Template.stories.events({
	
})

