import { Dataset, Chapters, getUserData } from '../lib/collections.js';
Template.story.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleChapter', id);
		self.subscribe('getUserData');

	})
	
})

Template.story.events({
	'click  article span, click article p p': function (e) {
		if(Session.get('editing') === 'deleting') {
			
			e.currentTarget.classList.add('aboutToBeDeleted');
			var array = Session.get('aboutToBeDeleted') || [];
			
			
			if(array.indexOf(e.currentTarget.id) < 0) {
				array.push(e.currentTarget.id);
			}
			Session.set('aboutToBeDeleted', array);
		}
		
	},
	'click .par' : function (e)	 {
		if(Session.get('editing') === 'editing') {

			e.currentTarget.classList.add('aboutToBeEdited');
			var array = Session.get('aboutToBeEdited') || [];
			
			
			if(array.indexOf(e.currentTarget.id) < 0) {
				array.push(e.currentTarget.id);
			}
			e.currentTarget.contentEditable = true;
			Session.set('aboutToBeEdited', array);

		}
	}
})

var getData = function () {
	var dataset = Chapters.find().fetch()[0].usedData;
	
	if(dataset.length > 0) {
		var searchArray =[]
			weatherArray =[]
			locationArray = []
			edgeArray = [];

	for(var i = 0; i < dataset.length; i++) {
		if(!(dataset[i] === '')) {
			if(dataset[i].dataType === 'user') {

				searchArray.push(dataset[i].dataText)
			}
			else if (dataset[i].dataType === 'weather'){
				weatherArray.push(dataset[i].dataText)
			}
			else if (dataset[i].dataType === 'location') {
				locationArray.push(dataset[i].dataText)
			}
			else if(dataset[i].dataType === 'family') {
				edgeArray.push('family');
			} 
		}
	}
	
	if(searchArray.length > 0) {
		getFacebookData(searchArray);
	}
	if(weatherArray.length > 0) {
		getWeatherData(weatherArray);
	}
	if(getLocationData.length >0) {
		getLocationData(locationArray);
	}

	if(edgeArray.length > 0) {
		getEdges(edgeArray)
	}
	
	}
}
var getEdges = function (array) {
	
	
	var fb_user_id = Meteor.users.find().fetch()[0].services.facebook.id;
	Meteor.call('fb_edges', fb_user_id, array[0], function (err, res) {
		if(err) {
				console.log(err)
			}
		if(array[0] === 'family') {
			getFamObj(res.data.data)
		}
	})
}
var getFamObj = function (data) {
	var obj = {};
	
	for(var i = 0; i<data.length;i++) {
		
		if(data[i].relationship === 'brother') {
			
			obj.brother = data[i].name;
		}
		else if(data[i].relationship === 'sister') {
			
			obj.sister = data[i].name;
		} else if(data[i].relationship === 'father') {
			
			obj.father = data[i].name;
		} else if(data[i].relationship === 'mother') {
			
			obj.mother = data[i].name;
		}

	}
	Session.set('family', obj)
}
var getLocationData = function(locationArray){

	Location.startWatching(function(pos){
	  	
	   Meteor.call('getLocation',pos,  function (err, res) {
	   	Session.set('userLocation', res.results[0].address_components[3].short_name);
	   })
	}, function(err){
	   console.log("Oops! There was an error", err);
	});
}
var getWeatherData = function (weatherArray) {

	Meteor.call('getWeather', function (err, res) {
		if(err) {console.log(err)}
			
		for(var i = 0; i <=weatherArray.length; i++) {

			if(weatherArray[i] === 'word') {
				var ids = res.weather[0].id.toString().split('');
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
				Session.set('word', text)
			}
			else if(weatherArray[i] === 'degrees') {

				Session.set('degrees', Math.floor(res.main.temp - 273.15))
			}
		}
	})
}
var getFacebookData = function (searchArray) {
	var searchField = ',' + searchArray.toString();
	
	 // Meteor.call('fb_me', searchField, function (err, res) {
		// 	if(err) {
		// 		console.log(err)
		// 	}
			
		// 	else {
				
		// 		if(searchArray.indexOf('music') >= 0) {
		// 			Session.set('music',res.data.music.data[0].name)
		// 		}
		// 		if(searchArray.indexOf('religion') >= 0) {
		// 			Session.set('religion',res.data.religion)
		// 		}
		// 		if(searchArray.indexOf('political') >= 0) {
		// 			Session.set('political',res.data.political)
		// 		}
		// 		if(searchArray.indexOf('favorite_athletes') >= 0) {
		// 			Session.set('favorite_athletes',res.data.favorite_athletes[0].name)
		// 		}
		// 		if(searchArray.indexOf('favorite_athletes') >= 0) {
		// 			Session.set('favorite_athletes',res.data.favorite_athletes[0].name)
		// 		}
		// 		if(searchArray.indexOf('devices') >= 0) {
		// 			Session.set('devices',res.data.devices[0].os)
		// 		}
		// 		if (searchArray.indexOf('education') >= 0) {
		// 			Session.set('education', res.data.education[res.data.education.length - 1].school.name)
		// 		}
		// 		if( searchArray.indexOf('work')  >= 0) {
		// 			Session.set('work', res.data.work[0].employer.name)
		// 		}
		// 		if(searchArray.indexOf('first_name,last_name') >= 0) {
		// 			formatNameObj(res.data.first_name, res.data.last_name)
		// 		}
		// 		if(searchArray.indexOf('relationship_status') >= 0) {
		// 			Session.set('relationship_status', res.data.relationship_status)
		// 		}
		// 		if(searchArray.indexOf('significant_other') >= 0) {
		// 			Session.set('significant_other', res.data.significant_other.name)
		// 		}
		// 	}
		// })
}
var formatNameObj = function (first, last) {
	var obj = {
		'v' :  first,
		'a' : last,
		'v+a' : first + ' ' + last,
		'vl+a' : first.charAt(0) + '. ' + last,
		'vl' : first.charAt(0) + '.',
	}
	Session.set('name', obj)
};

Template.registerHelper('formatDate', function(type){
	
	var date   = new Date(TimeSync.serverTime('', 2000));
	var curHr = date.getHours();
	var part;
	switch(type) {
		case 'minute':
			return date.getMinutes();
			break;
		case 'hour':
			return curHr;
			break;
		case 'month':
			return date.toLocaleDateString('nl-NL', { month: 'long'});
			break;
		case 'part':
			if(curHr < 12) {
		      part = "ochtend";
			} else if (curHr < 18 ) {
		      part = "middag";
			} else if( curHr < 23 ) {
		      part = "avond"
			} else {
				part = "nacht"
			}
			return part
			break;
		case 'day':
			return date.toLocaleDateString('nl-NL', { weekday: 'long'});
			break;
		case 'day_part':
			if(curHr < 12) {
			      part = "ochtend";
				} else if (curHr < 18 ) {
			      part = "middag";
				} else if( curHr < 23 ) {
			      part = "avond"
				} else {
					part = "nacht"
				}
				return  date.toLocaleDateString('nl-NL', { weekday: 'long'}) + part
			break;
	}
});

Template.story.helpers({
	isAdmin() {
		
		return window.location.pathname.indexOf('admin') > -1;
	},
	story() {
		return 'b;a'
	},
	istext () {
		if(this.type === 'p') {
			return true;
		}
		else {
			return false;
		}
	},
	chapter() {
		getData()
 		return Chapters.findOne()
 	},
 	isDate() {
 		
 		if(this.type === 'date') {
 			return true
 		}
 	},
	isDone() {
		if(this.type === 'p') {
			
			if(this.newPar) {
			return 'newPar'
		}
		else {
			return 'connect'
		}
		}
		else {
			return false
		}
	},
	getVar(item,format) {
		
		if (item === 'name' || item == 'family') {
			thing = this.format;
			
			if((Session.get(item) !== undefined) &&  this.format in Session.get(item)) {
				return Session.get(item)[this.format]
			}
		}
		
		else {
			return Session.get(item)
		}
	}
})
    