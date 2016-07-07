import { Stories, Fallbacks } from './../collections.js';

Meteor.methods({
	'stories_insert': function (isDuplicate, title, id, duplicateContent, duplicateId, duplicateTitle) {
		console.log(isDuplicate);
		var obj = {
			title: title,
			date: new Date(),
			content: [],
			settings: {
				forTests : false,
				nameFormat: '',
				genderReversed: false
			},
			usedData: [],
			duplicated: {
				isDuplicated: false,
				duplicatedStories: [],
				duplicateFrom: false,
				duplicateTitle: false
			}
		}
		
		if(isDuplicate) {
			obj.content = duplicateContent
			obj._id  = id,
			obj.duplicated.duplicateFrom = duplicateId;
			obj.duplicated.duplicateTitle = duplicateTitle
		}
		Stories.insert(
			obj
		);
	},
	'fallbacks_insert': function (category, male, female) {
		Fallbacks.insert({
			category: category,
			male: male,
			female: female
		} )
	}
})

