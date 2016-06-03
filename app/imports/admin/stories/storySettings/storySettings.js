import { Chapters, Dataset } from '../../../lib/collections.js';


Template.storySettings.events({
	'click #useUsername': function (e) {
		console.log(e.currentTarget.checked	);
		if(e.currentTarget.checked) {
			document.querySelector('.useUsername').classList.add('active')
		}
		else {
			document.querySelector('.useUsername').classList.remove('active')
		}
		
	},
	'click #useGender': function (e) {
		console.log(e.currentTarget.checked	);
		if(e.currentTarget.checked) {
			document.querySelector('.useGender').classList.add('active')
		}
		else {
			document.querySelector('.useGender').classList.remove('active')
		}
		
	},
	'submit form': function (e) {
		e.preventDefault();
		console.log(e.currentTarget)
		
		var chapterId = FlowRouter.getParam("chapterId");
		console.log(this)
		// chapterId = new Meteor.Collection.ObjectID(chapterId)
		var newTitle = document.querySelector('input#title').value;
		console.log(newTitle.length);
		if(newTitle.length > 0) {
			Chapters.update(chapterId, {
				$set: {
					title: newTitle
				}
			})
		}
		
		
		var selectBox = document.getElementById("format");
		
		

		var settings = {
			forTests : document.getElementById('forTesting').checked,
			useName: document.getElementById('useUsername').checked,
			useGender: document.getElementById('useGender').checked,
			name : {
				for: checkArray(document.querySelectorAll('input[name=character]')) || '',
				format: selectBox.options[selectBox.selectedIndex].value|| ''
			},
			gender : {
				for: checkArray(document.querySelectorAll('input[name=gender]'))|| '',
				reversed: checkArray(document.querySelectorAll('input[name=genderFormat]'))|| ''
			}
		}
		Chapters.update(chapterId, {
				$set: {
					settings: settings
				}
			})

		console.log(settings)
		e.currentTarget.reset();
		document.querySelector('.storySettings').classList.remove('active');
		document.querySelector('.filters').classList.add('active');


	}
})

var checkArray = function (array) {
	var value;
		for (var i = 0; i < array.length; i++) {
		    if (array[i].type === 'radio' && array[i].checked) {
		        // get value, set checked flag or do whatever you need to
		        value = array[i].value;       
		    }
		}
	return value;
}
