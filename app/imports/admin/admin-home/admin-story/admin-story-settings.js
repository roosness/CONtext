import { Stories } from '../../../../lib/collections.js';
import './admin-story-settings.html'


Template.storySettings.helpers({
	story() {
		return Stories.findOne({})
	},
	canDuplicate() {
		return !this.duplicated.duplicateFrom
	},
	checked (item, reverse) {
		if(item = 'genderReversed' && this.settings.genderReversed === reverse) {
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
		var stories = Stories.findOne({});
		if(stories) {
			if(select === stories.settings.nameFormat) {
				return 'selected'
			}
		}
		
	}
})
Template.storySettings.events({
	'click #openDuplicate': function (e) {
		e.preventDefault();
		document.querySelector('.popup.duplicate').classList.toggle('active');
	},
	'click #closeDuplicate': function (e) {
		e.preventDefault();
		document.querySelector('.popup.duplicate').classList.remove('active');
	},
	'submit form': function (e) {
		e.preventDefault();
		var selectBox = document.getElementById("format");

		var newSettings = {
			nameFormat: selectBox.options[selectBox.selectedIndex].value|| '',
			genderReversed: checkArray(document.querySelectorAll('input[name=genderFormat]'))
			
		}
		
		Meteor.call('stories_settings', FlowRouter.getParam("id"), newSettings, document.querySelector('input#newTitle').value)
		e.currentTarget.reset();
		Session.set('selectedAside', 'filters')
	}
})

var checkArray = function (array) {
	var value;
		for (var i = 0; i < array.length; i++) {
		    if (array[i].type === 'radio' && array[i].checked) {
		        console.log(i, array[i].value)
		        value = array[i].value;       
		    }
		}
	return JSON.parse(value);
}
Template.popupDuplicate.events({
	'submit form': function (e) {
		e.preventDefault();
		var story  = Stories.find().fetch()[0]
		var id = new Meteor.Collection.ObjectID()._str;
		
		Meteor.call('stories_duplicate', story._id, event.target.title.value.trim(), id)
		Meteor.call('stories_insert', true, event.target.title.value.trim(), id, story.content, story._id, story.title );
		
		FlowRouter.go('/admin')
	}
});
