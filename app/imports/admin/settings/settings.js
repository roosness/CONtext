import {  Fallbacks } from '../../../lib/collections.js';
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
	word(cat) {
		return Fallbacks.find({category: cat}).fetch()[0].words;

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
	},
	isGeslacht(dis) {
		if(dis === 'geslacht') {
			return true
		} else {
			return false
		}
		
	}, 
	parentId (dis) {
		return Fallbacks.find({category: 'geslacht'}).fetch()[0]._id
	}
})

Template.adminSettings.events({
	'submit .dataList':function (e) {
		e.preventDefault();
		var array = [];
		var wordArray = [];
		var inputs = document.querySelectorAll('.dataListItem input[type="text"]');
		var words = document.querySelectorAll('.geslacht input[type="text"]');
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].value) {
				array.push(inputs[i]);

			}
		}
		for(var i = 0; i < words.length; i++) {
			if(words[i].value) {
				wordArray.push(words[i]);

			}
		}
		
		for(var i = 0; i < array.length; i++) {
			Fallbacks.update({_id:array[i].id}, {
				$set: {
					fallback: array[i].value
				}
			})
		
		};
		
		for(var i = 0; i < wordArray.length; i++) {
			if(wordArray[i].classList.value === 'female') {
				Fallbacks.update({_id:wordArray[i].id}, {
					$set: {
						female : wordArray[i].value
					}
				})
			} else {
				Fallbacks.update({_id:wordArray[i].id}, {
					$set: {
						male : wordArray[i].value
					}
				})
			}
			
		
		};
		
		
		
		e.currentTarget.reset();
		
	},
	'submit .newWords':function (e) {
		e.preventDefault();
		
		Fallbacks.insert({category: 'geslacht',
			male: e.currentTarget.male.value,
			female: e.currentTarget.female.value})
	}

})

