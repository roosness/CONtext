import { Dataset, Chapters } from '../lib/collections.js';
if(Meteor.isServer) {
	Meteor.methods({
	removeContent : function (chapterId, arrayIDs) {
		for(var i = 0; i < arrayIDs.length; i++) {
			Chapters.update({_id: chapterId}, {$pull: {"content": {"_id": new Mongo.ObjectID(arrayIDs[i])} }})
		}
	},
	updateContent : function (chapterId, arrayIDs, newContent) {
		for(var i = 0; i < arrayIDs.length; i++) {
			Chapters.update({"content._id": new Mongo.ObjectID(arrayIDs[i])}, {$set: {"content.$.text": newContent[i] }})
		}
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
		console.log(url)
		var result = HTTP.call('GET', url, {})
		var data = JSON.parse(result.content)
		return data
	},
	fb_me: function(fields) {
		console.log('field' + fields)
	    var user = Meteor.users.findOne(this.userId);
	    var accessToken = user.services.facebook.accessToken;
	    console.log(accessToken)
	    if (!user || !accessToken)
	      throw new Meteor.Error(500, "Not a valid Facebook user logged in");
	    return HTTP.get("https://graph.facebook.com/me?fields=id"+ fields+ '', {
	      params: {access_token: accessToken}});
  },
  fb_edges: function (userId, edge) {
  	console.log(userId, edge);
	var user = Meteor.users.findOne(this.userId);
	var fbId = user.services.facebook.id;
	var accessToken = user.services.facebook.accessToken;
	var url = "https://graph.facebook.com/" + fbId + "/" + edge;
	console.log(url)
	if (!user || !accessToken) {
		throw new Meteor.Error(500, "Not a valid Facebook user logged in");
	} else {
		 return HTTP.get("https://graph.facebook.com/" + fbId + "/" + edge , {
	      params: {access_token: accessToken}});
	}
  }
})
}