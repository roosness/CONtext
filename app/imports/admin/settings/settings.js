import {  Fallbacks } from '../../lib/collections.js';
Template.adminSettings.onCreated(function () {
	var self = this;
	Session.clear();
	
	self.autorun(function () {
		self.subscribe('Fallbacks');
	})
})

Template.adminSettings.helpers({
	item() {
		return Fallbacks.find()
	}
})

Template.adminSettings.events({
	'submit form':function (e) {
		e.preventDefault();
		var fallbacks = {};
		fallbacks.category = e.currentTarget.selectCategory.value 
		fallbacks.fallback = e.currentTarget.fallback.value
		fallbacks.subcategory = e.currentTarget.subcategory.value
		console.log(fallbacks)
		
		var fallbacksId = new Meteor.Collection.ObjectID('576414812de8ee597672950a');
		Fallbacks.insert({
			fallbacks
		})

	}
})
