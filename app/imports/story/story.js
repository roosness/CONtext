import { Dataset, Chapters, Userdata } from '../lib/collections.js';
Template.story.onCreated(function () {
	var self = this;
	
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleChapter', id);
		self.subscribe('Userdata');
      });

	})

Template.story.events({
	'click  article span, click article p p': function (e) {
		if(Session.get('editing') === 'deleting') {
			
			
			var array = Session.get('aboutToBeDeleted') || [];
			
			if(e.currentTarget.classList.contains('aboutToBeDeleted')) {
				e.currentTarget.classList.remove('aboutToBeDeleted');
				var index = array.indexOf(e.currentTarget.id);
				array.splice(index, 1)
			} else {
				e.currentTarget.classList.add('aboutToBeDeleted');
				array.push(e.currentTarget.id);
			}
			console.log(array)
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


Template.registerHelper('formatDate', function(type){
	
	var date   = new Date(TimeSync.serverTime('', 2000));
	var curHr = date.getHours();

	var part;
	switch(type) {
		case '24':
			return date.getHours() + ':' + date.getMinutes()
			break;
		case 'year':

			return date.toLocaleDateString('nl-NL', { year: 'numeric'})
			break;
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
var source = {
	datablock: function () {
		var  a ;
		Tracker.autorun( function() {
		 a =  Userdata.find().fetch()[0];
		});
		return a
	},
	facebook: function (obj) {
		var datablock = source.datablock();
		// console.log(datablock, obj)
		var result;
		switch(obj.category) {
			case 'family':
				var famObj = datablock.family.data;
				result = findValueInObj(obj.subcategory, famObj, "relationship").name
				break;
			case 'likes': 
			
				if(obj.inObject) {
					if(obj.subcategory === 'music') {
						result  = datablock[obj.subcategory].data[0].name;
					}
					else {
						result = datablock[obj.subcategory][0].name
					}
				}
				else {
					result = datablock[obj.subcategory]
				}
				break;
			case 'other':
				result =  datablock[obj.subcategory][0].os
				break;
			default:
				console.log('something else')
		}
		return result
	},
	user: function (obj) {
		var datablock = source.datablock();
		
		var result;
		switch(obj.category) {
			case 'name': 

				result = formatNameObj(datablock.first_name, datablock.last_name, obj.subcategory);
				
				break;
			case 'work':
				result = datablock[obj.category][0].employer.name;
				break;
			case 'education':
				result = datablock[obj.category].slice(-1)[0].school.name;
				break;
			case 'relationship_status':
				result  = datablock[obj.category];
				break;
			case 'significant_other':
				result = datablock[obj.category].name;
				break;
			case 'interested_in':
			
				result  = datablock[obj.category][0];
				break;
			case 'birthday':
				
				result = new Date(datablock[obj.category]).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long'});

				break;
				
			default:
				console.log('something else')
		}
		return result
	},
	weather: function (obj) {
		console.log(obj)
		Meteor.call('getWeather', function (err, res) {
			if( err) {
				console.log(err)
			} else {
				console.log(res);
				var holder = {};
				holder.degrees = Math.floor(res.main.temp - 273.15);


				
				var ids = res.weather[0].id.toString().split('');
				
				switch(ids[0]) {
					case "2":
						holder.word = 'bliksemstorm';
						holder.worde = 'bliksemstormige';
						break;
					case "3":
						holder.word = 'druilerig';
						holder.worde = 'druilerige'
						break;
					case "5":
						holder.word = 'regenachtig';
						holder.worde = 'regenachtige';
						break;
					case "6":
						holder.word = 'besneeuwd';
						holder.worde = 'besneeuwde';
						break;
					case "7":
						holder.word = 'zonnig';
						holder.worde = 'zonnige';
						break;
					case "8":
						holder.word = 'mistig';
						holder.worde = 'mistige';
						break;
				};
				
				Session.set('weather', holder)
			
			}
		})
		return Session.get('weather')[obj.category]
	},
	location: function (obj) {
		var datablock = source.datablock();
		switch(obj.category) {
			case 'userLocation':
				Location.startWatching(function(pos){
	  	
				   Meteor.call('getLocation',pos,  function (err, res) {
				   	Session.set('userLocation', res.results[0].address_components[3].short_name);
				   })
				}, function(err){
				   console.log("Oops! There was an error", err);
				});
				return Session.get('userLocation')
			case 'houseLocation': 
				return datablock.location.name.split(',')[0];
				break;
			case 'bornLocation':
				return datablock.hometown.name.split(',')[0]
			
		}
	}
}

var findValueInObj = function(value, obj, objParam) {
	
	for(var i = 0; i < obj.length; i++) {
		
		if(obj[i][objParam] === value) {
			return obj[i]
		}
	}
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
Template.story.helpers({
	isAdmin() {
		return window.location.pathname.indexOf('admin') > -1;
	},
	isBreak (source) {
		if(source === 'break') {
			return true;
		} else {return false}
	},
	istext () {
		return this.istext
	},
	chapter() {
		console.log(this)
 		return Chapters.findOne()
 	},
 	isDate() {
 		if(this.source === 'date') {
 			return true 
 		}
 	},
 	getVar(obj) {
 		
 		switch(obj.source) {
 			case 'facebook':
	 			return source.facebook(obj);
	 			break;
	 		case 'user':
	 			return source.user(obj);
	 			break;
	 		case 'weather':
	 			return source.weather(obj);
	 			break;
	 		case 'location':
	 			return source.location(obj);
	 			break;
	 		default:
	 			console.log('something else') 
 		}
 	}
 	
})
    