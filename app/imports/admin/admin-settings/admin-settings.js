import { Fallbacks } from '../../../lib/collections.js';
import './admin-settings.html'

Template.adminSettings.onCreated(function () {
	var self = this;
	Session.clear();
	
	self.autorun(function () {
		self.subscribe('Fallbacks');
	})
})

Template.adminSettings.helpers({
	item(cat) {
		return Fallbacks.find({category: cat})
	},
	categories() {
		var array = [];
		var fallbacks = Fallbacks.find().fetch();
		for(var i in fallbacks) {
			if(array.indexOf(fallbacks[i].category) < 0) {
				array.push(fallbacks[i].category)
			}
		}

		return array;
	},
	isGeslacht(type) {
		console.log(this)
		return (type === 'geslacht') ? true : false		
	}
})

Template.adminSettings.events({
	'click .delete' : function (e) {
		e.preventDefault();
		Meteor.call('fallbacks_delete', e.currentTarget.id);
	},
	'submit .fallbacks':function (e) {
		e.preventDefault();
		var array = [];
		
		var inputs = document.querySelectorAll('.fallbacks input[type="text"]');
		
		for(var i in inputs) {
			if(inputs[i].value && inputs[i].classList.contains('fallback')) {
				Meteor.call('fallbacks_update', inputs[i].id, inputs[i].value)
			} else if (inputs[i].value) {
				Meteor.call('fallbacks_geslacht_update', inputs[i].id,inputs[i].classList[0], inputs[i].value)
			}
		}

		e.currentTarget.reset();
		
	},
	'submit .addGenderWords':function (e) {
		e.preventDefault();
		Meteor.call('fallbacks_insert', 'geslacht', e.currentTarget.male.value, e.currentTarget.female.value);
		e.currentTarget.reset();
	}
})

