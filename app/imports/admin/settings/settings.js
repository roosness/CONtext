import {  Fallbacks } from '../../lib/collections.js';
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
		for(var i = 0; i < fallbacks.length; i++) {
			if(array.indexOf(fallbacks[i].category) < 0) {
				array.push(fallbacks[i].category)
			}
		}

		return array;
	}
})

Template.adminSettings.events({
	'submit form':function (e) {
		e.preventDefault();
		var array = [];
		var inputs = document.querySelectorAll('.dataListItem input[type="text"]');
		
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].value) {
				array.push(inputs[i]);

			}
		}
		for(var i = 0; i < array.length; i++) {
			Fallbacks.update({_id:array[i].id}, {
				$set: {
					fallback: array[i].value
				}
			})
		
		};
		
		
		
		e.currentTarget.reset();
		
	}

})

