import { Chapters, Dataset, Filters } from '../../../lib/collections.js';
Template.filters.onCreated(function () {
	var self = this;
	Session.clear();
	Session.set('editing', false)
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleChapter', id);
		self.subscribe('Filters')
	})
})
var removeCLass = function (classname) {
	
	for(var i = 0; i<classname.length;i++) {
		var selected = document.querySelectorAll('.' + classname[i]);
			for(var x = 0; x < selected.length; x++) {
				console.log(selected[x]);
				selected[x].classList.remove(classname[i])
			 
			}
	}
}
var submitFilter = function (source, fallback, isstatic, istext, category, subcategory, content, inObject ) {
	var chapterId = FlowRouter.getParam("id");

	var obj = {
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

Template.filters.events({
	'click .startNewPar' : function (e) {
		var chapterId = FlowRouter.getParam("id");

		var obj = {
				source: 'break',
				fallback: null,
				isstatic: null,
				istext: null,
				category: null,
				subcategory: null,
				content: null,
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
		
		if(selected === 'name') {
			var format = document.querySelector(".selecter").value;
			
		}
		submitFilter(e.currentTarget.classList[0], 'fallback', true, false, e.currentTarget[e.currentTarget.id].value, format, null, false)
		
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
		submitFilter(e.currentTarget.classList[0], 'fallback', false, false, e.currentTarget[e.currentTarget.id].value , null, null, false)
	}
});


Template.editing.events({
	'click #deleting, click #editing':function (e) {
		e.preventDefault();
		// document.querySelector('.admin-edit-story-wrapper').classList.add(e.currentTarget.id);
		Session.set('editing', e.currentTarget.id);
	},

	'click #discard':function (e) {
		e.preventDefault();
		document.querySelector('.admin-edit-story-wrapper').classList.remove('editing', 'deleting');
		Session.set('editing', false);
		var allText  = document.querySelectorAll('article p p');
		console.log(allText.length)
		for(var i = 0; i < allText.length; i++) {
			console.log(i)
			console.log(allText[i]); 
			allText[i].contentEditable = false
		}

		removeCLass(['editing', 'deleting', 'aboutToBeDeleted', 'aboutToBeEdited'])
		Template.story.render.apply()
		
		delete Session.keys.aboutToBeDeleted

	},
	'click #save': function (e) {
		e.preventDefault();
		document.querySelector('.admin-edit-story-wrapper').classList.remove('editing', 'deleting');
		;
		var allText  = document.querySelectorAll('article p p');
		console.log(allText)
		for(var i = 0; i < allText.length; i++) {console.log(allText[i]); allText[i].contentEditable = false}

		if(confirm("Zeker weten dat je dit wilt toepassen?") == true) {
			if(Session.get('editing') === 'deleting') {
				Meteor.call('removeContent', FlowRouter.getParam("id"), Session.get('aboutToBeDeleted'));

			} else if(Session.get('editing') === 'editing') {
				var newContent = [];
				var session = Session.get('aboutToBeEdited');
				for(var i = 0; i<session.length;i++) {
					newContent.push(document.getElementById(session[i]).innerHTML)
				}
				Meteor.call('updateContent', FlowRouter.getParam("id"), Session.get('aboutToBeEdited'), newContent)
			}
			
		}
		else {
		
		}
		removeCLass(['editing', 'deleting', 'aboutToBeDeleted', 'aboutToBeEdited'])
		
		
		delete Session.keys.aboutToBeDeleted, delete Session.keys.aboutToBeEdited
		Session.set('editing', false)
	}
	
})


Template.editing.helpers({
	isEditing() {
		return Session.get('editing')
	}
})
