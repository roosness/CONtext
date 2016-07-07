import { Stories, Fallbacks, Tests } from './../collections.js';
Meteor.methods({
	stories_settings : function (id, newSettings, newTitle) {
		console.log('newSettings', newSettings, 'newTitle', newTitle)
		Stories.update(id, {
			$set: {
				settings:newSettings,
				title: newTitle
			}
		})
	},
	'stories_duplicate': function (id, dupTitle, dupId) {
		console.log("id, dupTitle, dupId", id, dupTitle, dupId)
		Stories.update(id, {
			$set: {"duplicated.isDuplicated": true},
			$push: {
				"duplicated.duplicatedStories": {
					title: dupTitle, 
					id: dupId
				}
			}
		})
	},
	stories_content_update: function (id, obj) {
		Stories.update(id, {
			$push: {content: obj}})
	},
	stories_order_update: function (storyId, contentId, number) {
		Stories.update({_id: storyId, 'content._id': new Mongo.ObjectID(contentId)}, {
			$set: {"content.$.order": number}
		})
	}, 
	story_content_remove: function (id, contentId) {
		Stories.update({_id: id}, {
			$pull: {
				content: 
					{"_id": new Mongo.ObjectID(contentId)}
				}
			}
		)
	},
	story_content_update: function (id, contentId, content) {
		Stories.update({_id: id, 'content._id': new Mongo.ObjectID(contentId)}, {
			$set: {'content.$.content': content}
		})
	},
	'fallbacks_update': function (id, value) {
		console.log(id, value)
		Fallbacks.update({_id:id}, {
			$set: {
				fallback: value
			}
		})
	},
	'fallbacks_geslacht_update' : function (id, type, value) {
		console.log(id, type, value);
		if(type==='female') {
				Fallbacks.update({_id: id}, {$set: {female: value}})
		} else {
			Fallbacks.update({_id: id}, {$set: {male: value}})
		}
	},
	'Test_update': function (number, testusers) {
		var id = Tests.find().fetch()[0]._id;
		Tests.update({_id: id}, {
			'numberOfChapters': Number(number),
			'isActive': false,
			"testusers": testusers
		})
	},
	'init_test': function (userid, id, active) {
		console.log(userid, id, active);
		Tests.update({_id: id, "testusers.userid": userid}, {
			$set: {
				"testusers.$.userTestActive": active,
				"testusers.$.currentStory": 0
			}
		});
		Meteor.users.update({_id: userid}, {
			$set: {
				"profile.testActive": active,
				"profile.currentStory": 0
			}
		})
	},
	'current_story_update' : function (number, userid, testId) {
		console.log(number, userid, testId);
		Tests.update({_id: testId, "testusers.userid": userid}, {
			$set: {
				"testusers.$.currentStory": number
			}
		})
		Meteor.users.update({_id: userid}, {
			$set: { "profile.currentStory": number}
		})
	},
	'finish_test': function (userid, testId) {
		Tests.update({_id: testId, "testusers.userid": userid}, {
			$set: {
				"testusers.$.userTestActive": false,
				"testusers.$.currentStory": 0
			}
		});
		Meteor.users.update({_id: userid}, {
			$set: {
				"profile.testActive": false,
				"profile.currentStory": 0
			}
		})
	}

})
