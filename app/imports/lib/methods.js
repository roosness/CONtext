import { Dataset, Chapters, Tests, Userdata, Fallbacks } from '../lib/collections.js';
if(Meteor.isServer) {
	Meteor.methods({
	changeOrders: function (contentids, chapterid) {
		
		for(var i = 0; i < contentids.length; i++) {
			Chapters.update({_id: chapterid, "content._id": new Meteor.Collection.ObjectID(contentids[i].id)}, {
				$set : {
					"content.$.order": i
				}
			})
		}
	},

	changeOrder: function(contentId, chapterId, number) {
		console.log(contentId, chapterId, number)
		
		Chapters.update({_id: chapterId, "content._id": new Meteor.Collection.ObjectID(contentId)}, {
			$set: {
				"content.$.order": number
			}
		})
	},
	stopTest_user: function (userid, active, number) {
		Meteor.users.update({_id: userid}, {
			$set: {
				
				"profile.testActive": active,
				"profile.currentStory": number
				
			}
		})
	},
	stopTest_test: function(testid, userid, active, number) {
		
		Tests.update({_id: testid, "testusers.userid": userid}, {
			$set: {
				"testusers.$.userTestActive": active
			}
			
		})
		
	},
	startTest_test: function(testid, userid, active, number) {

		Tests.update({_id: testid, "testusers.userid": userid}, {
			$set: {
				"testusers.$.userTestActive": active,
				"profile.currentStory": number
			}
			
		})
	},
	startTest_user: function (userid, active, number) {
		
		Meteor.users.update({_id: userid}, {
			$set: {
				
				"profile.testActive": active,
				"profile.currentStory": number
				
			}
		})
	},
	userTest_currentStory_test: function (testid, userid, currentNumber) {
		
		Tests.update({_id: testid, "testusers.userid": userid}, {
			$set: {
				"testusers.$.currentStory": currentNumber
			}
		})
	},
	userTest_currentStory : function (userid, currentNumber) {
		
		Meteor.users.update({_id: userid}, {
			$set: {
				"profile.currentStory": currentNumber 
			}
		})
	},
	userTest: function (userid, tester, active, object, currentNumber) {
		Meteor.users.update({_id: userid}, {
			$set: {
				"profile.tester":tester,
				"profile.testActive": active,
				"profile.orderChapter": object,
				"profile.currentStory": currentNumber 
			}
		})
	},
	removeContent : function (chapterId, arrayIDs) {
		
		for(var i = 0; i < arrayIDs.length; i++) {
			Chapters.update({_id: chapterId}, {$pull: {"content": {"_id": new Mongo.ObjectID(arrayIDs[i])} }})
		}
	},
	updateContent : function (chapterId, id, content) {
		console.log(chapterId, content, id)

			
			Chapters.update({"_id":chapterId, "content._id": new Mongo.ObjectID(id)}, {
				$set: {"content.$.content": content }})
		
	},
	returnVars: function (item) {
		return 'ba'
	},
	getWeather: function () {
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=AMSTERDAM&APPID=d03214818693dafe62dc570f3889ace5';
		var result = Meteor.http.call('GET', url) 
		if(result.statusCode == 200) {
			var data = JSON.parse(result.content);
			return data
		}
	},
	getLocation: function (ll) {
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + ll.latitude + ',' + ll.longitude + '&key=AIzaSyDGUP3zJPdET5sFcnCliWZjFTS0hsX2zYw';
		
		var result = HTTP.call('GET', url, {})
		var data = JSON.parse(result.content)
		return data
	},
	insertUserData: function(obj) {
		Userdata.insert(obj)
	},
	fb_me: function(fields) {
		
	    var user = Meteor.users.findOne(this.userid);
	    var accessToken = user.services.facebook.accessToken;
	    
	    if (!user || !accessToken)
	      throw new Meteor.Error(500, "Not a valid Facebook user logged in");
	    return HTTP.get("https://graph.facebook.com/me?fields=id"+ fields+ '', {
	      params: {access_token: accessToken}});
  },
  fb_edges: function (userid, edge) {
  	
	var user = Meteor.users.findOne(this.userid);
	var fbId = user.services.facebook.id;
	var accessToken = user.services.facebook.accessToken;
	var url = "https://graph.facebook.com/" + fbId + "/" + edge;
	
	if (!user || !accessToken) {
		throw new Meteor.Error(500, "Not a valid Facebook user logged in");
	} else {
		 return HTTP.get("https://graph.facebook.com/" + fbId + "/" + edge , {
	      params: {access_token: accessToken}});
	}
  }
})
}

var findValueInObj = function(value, obj, objParam) {
	
	for(var i = 0; i < obj.length; i++) {
		
		if(obj[i][objParam] === value) {
			return obj[i]
		}
	}
}