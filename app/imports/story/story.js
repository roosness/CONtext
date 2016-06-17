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
		console.log(datablock)
		var result;
		switch(obj.category) {
			case 'family':
				var famObj = datablock.family.data;
				result = findValueInObj(obj.subcategory, famObj, "relationship").name
				break;
			case 'likes': 
				var obj = datablock[obj.subcategory].data[0].name;
				result  = obj;
			default:
				console.log('something else')

		}
		
		return result
	}
}
var findValueInObj = function(value, obj, objParam) {
	
	for(var i = 0; i < obj.length; i++) {
		
		if(obj[i][objParam] === value) {
			return obj[i]
		}
	}
}
Template.story.helpers({
	isAdmin() {
		return window.location.pathname.indexOf('admin') > -1;
	},
	istext () {
		return this.istext
	},
	chapter() {
		
 		return Chapters.findOne()
 	},
 	isDate() {
 		return false
 	},
 	getVar(obj) {
 		
 		switch(obj.source) {
 			case 'facebook':
	 			return source.facebook(obj);
	 			break;
	 		default:
	 			console.log('something else') 
 		}
 	}
 	
})
    