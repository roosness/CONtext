if(Meteor.isServer) {
	Meteor.methods({
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
	})
}