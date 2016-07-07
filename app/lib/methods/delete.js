import { Stories, Fallbacks } from './../collections.js';
Meteor.methods({
	stories_remove : function (id) {
		Stories.remove(id)
	},
	stories_duplicates_remove: function (targetId) {
		var ownId = targetId.split(',')[0]
		var parentId = targetId.split(',')[1];
		if((Stories.find(parentId).fetch()[0].duplicated.duplicatedStories.length -1) === 0) {
			Stories.update(parentId, {
				$set: { "duplicated.isDuplicated":false },
				$pull: { "duplicated.duplicatedStories": {id: ownId}}
			})
		} else {
			Stories.update(parentId, {
				$pull: {"duplicated.duplicatedStories": {id: ownId}}
			})
		}
		Stories.remove(ownId)
	},
	fallbacks_delete: function (id) {
		Fallbacks.remove(id)
	}
})
