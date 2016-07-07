import { Stories, userData, Fallbacks } from '../../lib/collections.js';

import './story.html'

Template.story.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('Fallbacks');
		self.subscribe('singleStory', FlowRouter.getParam('id'));
		self.subscribe('userData', Meteor.userId());
	});
});

Template.story.helpers({
	story() {
		return Stories.find().fetch()[0]
	},
	isBreak () {
		return (this.source === 'break') ? true : false
	},
	istext () {
		return (this.category === 'head' || this.category === 'par') ? true : false
	},
 	chaptercontent() {
 		var contents = Stories.findOne().content
 		var a =  _.sortBy(contents, function (content) { return content.order});
 		return a
 	},
 	isHeading() {
 		return (this.category === 'head') ? true : false
 	},
 	getVar() {
 		if(this.source !== 'break') {
 			return getVarData(this.source, this);
 		}
 	}
})
var getVarData = function (type, obj) {

	
	var source = {
		datablock: function () {
			var  a ;
			Tracker.autorun( function() {
			 a =  userData.find().fetch()[0];
			});
			return a
		},
		facebook: function (obj) {
			var datablock = source.datablock();
			var result = null;
			switch(obj.category) {
				case 'family':
					if(datablock[obj.category] === undefined) {
						return getFallback(obj)
					} else {
						console.log(datablock.family.data);
						for(var i = 0; i < datablock.family.data.length; i++) {
							if(datablock.family.data[i].relationship === obj.subcategory) {
								result = datablock.family.data[i]
							}
						}
						return (result !== null) ? result.name : getFallback(obj)
					}
					break;
				case 'likes': 
					var datablock = source.datablock();
					var answers = {
						'music' : function () {
							return datablock[obj.subcategory].data[0].name
						},
						'religion' :  function () {
							return datablock[obj.subcategory];
						},
						'political' : function () {
							return datablock[obj.subcategory];
						},
						'favorite_athletes' : function () {
							return datablock[obj.subcategory][0].name
						},
						'favorite_teams' : function() {
							return datablock[obj.subcategory][0].name
						}
					}
					return fallbackOrData(obj, datablock, answers);					
					break;
				case 'other':
					return (fallbackNeeded(obj, datablock)) ? datablock[obj.subcategory][0].os : getFallback(obj);
					break;
				default:
					console.log('something else')
			}
		},
		user: function (obj) {
			var datablock = source.datablock();
			var result;
			var answers = {
				'work' : function () {
					return datablock[obj.subcategory][0].employer.name
				},
				'education' :  function () {
					return datablock[obj.subcategory].slice(-1)[0].concentration[0].name;
				},
				'relationship_status' : function () {
					return datablock[obj.subcategory];
				},
				'significant_other' : function () {
					return datablock[obj.subcategory].name
				},
				'interested_in' : function() {
					return datablock[obj.subcategory][0];
				},
				'birthday' : function() {
					var day = new Date(datablock[obj.subcategory])
					console.log(day.getDate() + day.getMonth());
					return day.getDate() + ' ' + getDayforDate(day, 'month' );
				},
				'name' : function() {
					var names = {
						'v' :  datablock.first_name,
						'a' : datablock.last_name,
						'v+a' : datablock.first_name + ' ' + datablock.last_name,
						'vl+a' : datablock.first_name.charAt(0) + '. ' + datablock.last_name,
						'vl' : datablock.first_name.charAt(0) + '.',
					}
					console.log(names);
					return names[obj.format]
				},
				'geslacht' : function() {
					console.log(obj, obj.format);
					var reversed = Stories.find().fetch()[0].settings.genderReversed;
					var words = Fallbacks.find({female: obj.format}).fetch()[0];
					
					var ownGender = userData.find().fetch()[0].gender;
					return (!reversed)? words[ownGender] : words[reverseGender(ownGender)]
					
				}
			}
			if(obj.format !== null) {
				return answers[obj.subcategory]();
			}
			return fallbackOrData(obj, datablock, answers);
		},
		weather: function (obj) {
			if(oldSession()) {
				Meteor.call('getWeather', function (err, res) {
				if(err) {console.log(err)}
				else {
					var ids = res.weather[0].id.toString().split('')[0];
					var answers = {
						2: ['bliksemstorm','bliksemstormige'],
						3: ['druilerig','druilerige'],
						5: ['regenachtig','regenachtige'],
						6: ['besneeuwd','besneeuwde'],
						7: ['zonnig','zonnige'],
						8: ['mistig','mistige'],
					}
					var words = answers[ids]
					var weather = pushWeatherObj(words[0], words[1], res);
					Session.set('weather', weather);
				}
			})
			}
			if(Session.get('weather')) {
				return Session.get('weather')[obj.subcategory]
			} else {
				return '...'
			}
		},
		location: function (obj) {
			var datablock = source.datablock();
			switch(obj.subcategory) {
				case 'userLocation':
					Location.startWatching(function(pos){
					   Meteor.call('getLocation',pos,  function (err, res) {
					   	Session.set('userLocation', res.results[0].address_components[3].short_name);
					   })
					}, function(err){
						var fallback = Fallbacks.find({subcategory: obj.subcategory}).fetch()[0].fallback;
						Session.set('userLocation', fallback )
					   console.log("Oops! There was an error", err);
					});
					if(Session.get('userLocation')) {
						return Session.get('userLocation')
					} else {
						return '...'
					}
					return Session.get('userLocation')
				case 'location':
					return (fallbackNeeded(obj, datablock)) ? datablock.location.name.split(',')[0] : getFallback(obj);
					break;
				case 'hometown':
					return (fallbackNeeded(obj, datablock)) ? datablock.hometown.name.split(',')[0] : getFallback(obj);
			}
		},
		date: function (obj) {
				var date   = new Date(TimeSync.serverTime('', 2000));
				return getDayforDate(date, obj.subcategory)
		}
	}
	return source[type](obj)
}

var fallbackOrData = function (obj, datablock, answers) {
	if(fallbackNeeded(obj, datablock)) {
			return answers[obj.subcategory]();
		} else {
			return getFallback(obj)
		}
}

var reverseGender = function (initialGender) {
	if(initialGender === 'female') {
		return 'male'
	} else {
		return 'female'
	}
}

var getDayforDate = function (date, type) {
	var months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'october', 'november', 'december'];
	var dagen = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
	var types = {
		'24': addZero(date.getHours()) + ':' + addZero(date.getMinutes()),
		'year': date.getFullYear(),
		'minute': addZero(date.getMinutes()),
		'hour': date.getHours(),
		'month': months[date.getMonth()],
		'day' :dagen[date.getDay()],
		'part' : getPart(date.getHours()),
		'day_part': dagen[date.getDay()] + getPart(date.getHours())
	} 
	return types[type]
}
function getPart(curHr) {
	var part;
	if(curHr < 12 && curHr > 6) {
	      part = "ochtend";
	} else if (curHr < 18 ) {
	      part = "middag";
	} else if( curHr < 23 ) {
	      part = "avond"
	} else {
		part = "nacht"
	}
	return part
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var fallbackNeeded = function (obj, datablock) {
	if(datablock[obj.subcategory] === undefined) {
		return false
	} else {
		return true
	}
}

var getFallback = function(cat, result) {
		var fallbacks = Fallbacks.find({subcategory: cat.subcategory}).fetch()[0];
		return fallbacks.fallback
}
var formatNameObj = function (first, last, format) {
	var obj = {
		'v' :  first,
		'a' : last,
		'v+a' : first + ' ' + last,
		'vl+a' : first.charAt(0) + '. ' + last,
		'vl' : first.charAt(0) + '.',
	}
	return obj[format]
};
var oldSession = function () {
	if(Session.get('weather')) {
		var diff = new Date() - Session.get('weather').date;
		return diff > 300000
	} else {
		return true
	}
}
var pushWeatherObj = function (word, worde, res) {
	var weather = {};
	weather.degrees = Math.floor(res.main.temp - 273.15);
	weather.word = word;
	weather.worde = worde;
	weather.date = new Date();
	return weather
}