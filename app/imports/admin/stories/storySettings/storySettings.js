import { Chapters, Dataset } from '../../../lib/collections.js';
Template.storySettings.onCreated(function () {
	var self = this;

	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		
		self.subscribe('singleChapter', id);
		self.subscribe('Tests');
	})
})
Template.storySettings.helpers({
	chapter() {
		return Chapters.findOne({})
	},
	checked (item, reverse) {
		
		if(item = 'genderReversed' && Chapters.find().fetch()[0].settings.genderReversed === reverse) {
			
			return 'checked'
		}
		if(this.settings.forTests) {
			
			return 'checked'
		}
	},
	formatNames() {
		var format = ["v", "a", "v+a", "vl+a", "vl"];
		return format
	},
	
	isSelected (select) {
		if(select === Chapters.findOne({}).settings.nameFormat) {
			return 'selected'
		}
	}
})
Template.storySettings.events({
	'submit form': function (e) {
		e.preventDefault();
		
		
		var chapterId = FlowRouter.getParam("id");
		
		var newTitle = document.querySelector('input#title').value;
		console.log(newTitle.length);
		if(newTitle.length > 0) {
			console.log('go')
			Chapters.update(chapterId, {
				$set: {
					title: newTitle
				}
			})
		}
		
		
		
		var selectBox = document.getElementById("format");
		
		console.log(selectBox.options[selectBox.selectedIndex].value|| '')

		var newSettings = {
			nameFormat: selectBox.options[selectBox.selectedIndex].value|| '',
			genderReversed: checkArray(document.querySelectorAll('input[name=genderFormat]'))
			
		}
		Chapters.update(chapterId, {
				$set: {
					settings: newSettings
				}
			})
		
		console.log(newSettings)
		e.currentTarget.reset();
		document.querySelector('.storySettings').classList.remove('active');
		document.querySelector('.filters').classList.add('active');


	}
})

var checkArray = function (array) {
	var value;
	console.log(array)
		for (var i = 0; i < array.length; i++) {
		    if (array[i].type === 'radio' && array[i].checked) {
		        console.log(i, array[i].value)
		        value = array[i].value;       

		    }
		}
	console.log(value)
	return JSON.parse(value);
}
