import { Chapters, Dataset, Filters, Fallbacks } from '../../../lib/collections.js';
Template.filters.onCreated(function () {
	var self = this;
	Session.clear();
	Session.set('editing', false)
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleChapter', id);
		self.subscribe('Filters');
		self.subscribe('Fallbacks');
	})
})


var submitFilter = function (source, fallback, isstatic, istext, category, subcategory, content, inObject ) {
	var chapterId = FlowRouter.getParam("id");
	var number = document.querySelectorAll('article p').length + 1;
	console.log(number)
	var obj = {
			order: number,
			source: source,
			fallback: fallback,
			isstatic: isstatic,
			istext: istext,
			category: category,
			subcategory: subcategory,
			content: content,
			inObject: inObject,
			 _id: new Meteor.Collection.ObjectID(),
		}
		console.log(obj)
	Chapters.update(chapterId, {
			$push: {
				
				content: obj
			}
		})
}
Template.person.helpers({
	formatNames() {
		var format = [, "v", "a", "v+a", "vl+a", "vl"];
		return format
	},
	words() {
		var words = ['zijn','hij', 'man', 'mannen', 'jongen', 'jongens']
		return words
	},
	selectedFormat () {
		console.log(this.settings.name.format)
		return this.settings.name.format;
	},
	isSelected (select) {
		
		
		if(select === Chapters.findOne({}).settings.nameFormat) {
			return 'selected'
		}
	}
})
Template.filters.helpers({
	isEditing() {
		return Session.get('editing')
	}
})

Template.filters.events({
	'click .startNewPar' : function (e) {
		var chapterId = FlowRouter.getParam("id");
		var number = document.querySelectorAll('article p').length + 1;
		var obj = {
				order: number,
				source: 'break',
				fallback: null,
				isstatic: null,
				istext: null,
				category: null,
				subcategory: null,
				content: null,
				 _id: new Meteor.Collection.ObjectID(),
				inObject: null
			}
			console.log(obj)
		Chapters.update(chapterId, {
				$push: {
					
					content: obj
				}
			})
	},
	'click #storySettings' : function (e) {
		e.preventDefault();
		document.querySelector('.storySettings').classList.toggle('active');
		document.querySelector('.filters').classList.toggle('active');
	},
	'click .filters li span' : function (e) {
		
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
	'submit .newParagraph' : function (e) {
		e.preventDefault();
	
		submitFilter('admin', 'fallback', true, true, e.currentTarget.classList[0], null, e.target.paragraph.value.trim(), false )
		e.currentTarget.reset();
	},
	'submit .newHeading' : function (e) {
		e.preventDefault();
		submitFilter('admin', 'fallback', true, true, e.currentTarget.classList[0], null, e.target.subkop.value.trim(), false )
		e.currentTarget.reset();
	},
	'submit form.facebook' : function (e) {
		e.preventDefault();
		var objArray = ['music', 'favorite_athletes', 'favorite_teams'];
		
		var inObject = objArray.indexOf(e.currentTarget[e.currentTarget.id].value) > -1;
		
		submitFilter(e.currentTarget.classList[0], 'fallback', true, false, e.currentTarget.id, e.currentTarget[e.currentTarget.id].value, null, inObject)
		e.currentTarget.reset();
	},
	'submit form.user' : function (e) {
		e.preventDefault();
		var selected = e.currentTarget.user.value;
		var format;
		if(selected === 'name') {

			format = document.querySelector(".selecter").value;
		} else {
			format = e.currentTarget[e.currentTarget.id].value
		}
		console.log(format)
		submitFilter(e.currentTarget.classList[0], 'fallback', true, false, e.currentTarget.classList[0], format, null, false)
		
		e.currentTarget.reset();
		
	},
	'submit form.date': function (e) {
		e.preventDefault();
		submitFilter(e.currentTarget.classList[0], 'fallback', false, false, 'date' , e.currentTarget[e.currentTarget.id].value, null, false)
	},
	'submit form.weather': function (e) {
		e.preventDefault();
		submitFilter(e.currentTarget.classList[0], 'fallback', false, false, e.currentTarget[e.currentTarget.id].value , null, null, false)
	},
	'submit form.location' : function (e) {
		e.preventDefault();
		console.log(e.currentTarget.location.value)
		submitFilter(e.currentTarget.classList[0], 'fallback', false, false, e.currentTarget.classList[0] , e.currentTarget.location.value, null, false)
	}
});

