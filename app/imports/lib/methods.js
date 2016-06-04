import { Dataset, Chapters } from '../lib/collections.js';

if(Meteor.isServer) {
	Meteor.methods({
	
	returnVars: function (item) {
		return 'ba'
	},
	getWeather: function (type) {
		
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=AMSTERDAM&APPID=d03214818693dafe62dc570f3889ace5';
		var result = Meteor.http.call('GET', url) 
		if(result.statusCode == 200) {
			var data = JSON.parse(result.content);
			
			
			return data;

			
			
		}
		
	
	},
	getDate: function (type, date) {
		
		

	},
	calcWeather: function (data, type) {
		console.log('start')
		
		var ids = data.toString().split('');
		
		var text;
		switch(ids[0]) {
			
			case "2":
				text = 'bliksemstorm';
				break;
			case "3":
				text = 'druilerige';
				break;
			case "5":
				text = 'regenachtige';
				break;
			case "6":
				text = 'besneeuwde';
				break;
			case "7":
				text = 'zonnige';
				break;
			case "8":
				text = 'mistige';
				break;
		}
		console.log(type)
		if(type === 'word') {
			console.log(type)
			Session.set('weatherWord', text )
		}
		return text
		
	},
	fb_me: function(fields) {
		console.log('field' + fields)
	    var user = Meteor.users.findOne(this.userId);
	    //note: I don't have access to a meteor project hooked up to the FB API
	    //so where the access token is stored in a user object may differ,
	    //I got this from an old project. Try logging user here to find it
	    //if this doesn't work
	    var accessToken = user.services.facebook.accessToken;

	    if (!user || !accessToken)
	      throw new Meteor.Error(500, "Not a valid Facebook user logged in");

	    return HTTP.get("https://graph.facebook.com/me?fields=id,name"+ fields+ '', {
	      params: {access_token: accessToken}});
  }

})


}