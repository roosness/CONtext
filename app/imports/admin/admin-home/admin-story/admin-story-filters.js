import { Stories, Fallbacks, userData } from '../../../../lib/collections.js';

import './admin-story-filters.html'

Template.filters.events({
	'click label[for="naam"]' : function (e) {
		document.querySelector('div.naam').classList.toggle('active')
	},
	'click .filter-list li span' : function (e) {
		console.log('click')
		var links = document.querySelectorAll('.filters li');
		for(var i = 0; i< links.length; i++) {
			
			if(links[i]== e.currentTarget.parentNode) {
				links[i].classList.toggle('showFilter');
			}
			else {
				links[i].classList.remove('showFilter');
			}
		}
	},
	'click .startNewPar' :function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var obj = {
			
			source: 'break',
			isstatic: null,
			istext: null,
			category: null,
			subcategory: null,
			content: null,
			 _id: new Meteor.Collection.ObjectID(),
			
		}
		submitFilter(obj)
	},
	'submit .insert' : function (e) {
		e.preventDefault();
		console.log('ja')
		if(!(e.target.text.value === '')) {
			var obj = {
				
				source: 'admin',
				isstatic: true,
				istext: true,
				category: e.currentTarget.classList[1],
				subcategory: null,
				content: e.target.text.value.trim(),
				inObject: false,
				_id: new Meteor.Collection.ObjectID()

			}
		}
		submitFilter(obj)
		e.currentTarget.reset();
	},
	'submit form.filter': function (e) {
		e.preventDefault();
		
		console.log(e.currentTarget.id)
		if(e.currentTarget.id === 'user') {
			 var selected = e.currentTarget.user.value;
		}
		var formats = {
			'name': document.querySelector(".nameSelector").value,
			'geslacht' : document.querySelector(".geslachtSelector").value,
			'default': null
		}
		var obj = {
				
				source: e.currentTarget.classList[0],
				category: e.currentTarget.id,
				subcategory: e.currentTarget[e.currentTarget.id].value,
				content: null,
				_id: new Meteor.Collection.ObjectID(),
				format: formats[selected || 'default']

			}

		
		
		console.log(obj)
		submitFilter(obj)
	},
})
function submitFilter(obj) {
	var items = document.querySelector(".story p").children;
	obj.order = items.length + 1;
	Meteor.call('stories_content_update', FlowRouter.getParam('id'), obj)
}

Template.person.helpers({
	formatNames() {
		var format = [, "v", "a", "v+a", "vl+a", "vl"];
		return format
	},
	words() {
		var words = [];
		var data = Fallbacks.find({category: 'geslacht'}).fetch()
		for(var i = 0; i < data.length;i++) {

			words.push({
				female: data[i].female,
				male: data[i].male
			})
		}
		console.log(words);
		return words
	},
	other(a) {
		console.log(a);
	},
	selectedFormat () {
		console.log(this.settings.name.format)
		return this.settings.name.format;
	},
	isSelected (select) {
		var story = Stories.find().fetch()[0];
		if(story) {
			if(story.settings.nameFormat === select) {
				return 'selected'
			}
		}
	}
})