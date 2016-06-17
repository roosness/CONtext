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
Template.editing.events({
	'click #deleting, click #editing':function (e) {
		e.preventDefault();
		document.querySelector('.admin-edit-story-wrapper').classList.add(e.currentTarget.id);
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

		removeCLass(['aboutToBeDeleted'])
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
		removeCLass(['editing', 'deleting'])
		
		
		delete Session.keys.aboutToBeDeleted, delete Session.keys.aboutToBeEdited
		Session.set('editing', false)
	}
	
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
Template.editing.helpers({
	isEditing() {
		return Session.get('editing')
	}
})
Template.filters.helpers({
	chapter() {

		return Chapters.findOne({})
	},
	
	useUser() {
		if(this.settings.useName || this.settings.useName ) {
			return true
		}
		else {
			return false
		}
	}
})

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
		console.log(this)
		var chapterId = FlowRouter.getParam("id");
		
		var a = Chapters.find().fetch()[0];
		console.log(a)
		
		
		if(a.content.lenght > 0) {
			var lastItem = a.content[a.content.length -1];
			console.log(lastItem)
			var newParagraph = false;
			if(lastItem.type.toString() === undefined || lastItem.type.toString() !== 'p') {
				newParagraph = false;
			}
			else {
				newParagraph = true;
			}
		} else {
			newParagraph = true
		}
		
		Chapters.update(chapterId,  {
			$addToSet: {
				content: {
					_id: new Meteor.Collection.ObjectID(),
					text: e.target.paragraph.value.trim(),
					type: 'p',
					date: new Date(),
					newPar: newParagraph
				}
			}
		})
		
		
		
		e.target.paragraph.value = ''
	},
});


Template.weather.events({
	'submit .addVarWeather' : function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;

		
		var usedData = Chapters.find().fetch()[0].usedData;
		
		var usedDataIns = {
			dataType : 'weather',
			dataText : selected,
		};
		console.log(selected)
		console.log(usedData.length)
		for(var i = 0; i < usedData.length; i++) {
			console.log(usedData[i].dataText)
			if(usedData[i].dataText === selected) {
				usedDataIns = ''
			}
		}

		console.log(usedDataIns)
		Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					type: 'weather',
					date: new Date()
				}
			}
		})
		
	}
})

 Template.date.events({
	'submit .addVarDate' : function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;

		Chapters.update(chapterId, {
			$addToSet: {
				
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					type: 'date',
					date: new Date()
				}
			}
		})
	}
})
 Template.other.events({
 	'submit form': function (e) {
 		e.preventDefault();
 		var chapterId = FlowRouter.getParam("id");
			
			var selected = e.currentTarget.type.value;


			var usedData = Chapters.find().fetch()[0].usedData;
			
			var usedDataIns = {
				dataType : 'user',
				dataText : selected,
			};
		
		
			for(var i = 0; i < usedData.length; i++) {
				
				if(usedData[i].dataText === selected) {
					usedDataIns = ''
				}
			}

			Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					type: 'user',
					date: new Date()
				}
			}
		})
 	}
 })
Template.location.events({
	'submit .addVarLoaction' : function (e) {
		e.preventDefault();
			var chapterId = FlowRouter.getParam("id");
			
			var selected = e.currentTarget.type.value;


			var usedData = Chapters.find().fetch()[0].usedData;
			
			var usedDataIns = {
				dataType : 'location',
				dataText : selected,
			};
		
		
			for(var i = 0; i < usedData.length; i++) {
				
				if(usedData[i].dataText === selected) {
					usedDataIns = ''
				}
			}

			Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					type: 'location',
					date: new Date()
				}
			}
		})

	}
})
 Template.person.events({
 	'change select': function (e) {
 		
 		e.currentTarget.parentNode.classList.add('active')
 		
 	},
 	'submit form' : function (e) {
 		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;
		console.log(selected)
		
		
		var format = Chapters.find().fetch()[0].settings.nameFormat;
		var usedData = Chapters.find().fetch()[0].usedData;
		
		var usedDataIns = {
			dataType : 'user',
			dataText : selected,
		};
		console.log(usedData.length)
		for(var i = 0; i < usedData.length; i++) {
			if(usedData[i].dataText === selected) {
				usedDataIns = ''
			}
		}
		
		

		
		console.log(usedDataIns);
		if(selected === 'name') {
			console.log(selected);
			var selectBox = document.querySelector(".selecter");
			console.log(selectBox.value)
			usedDataIns.dataText = 'first_name,last_name';
			format = selectBox.value;
			
		}
		console.log(format)
		Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					format: format,
					type: 'user',
					date: new Date()
				}
			}
		})
 	}
 })
Template.family.events({
 	'submit form' : function (e) {
 		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;
		console.log(selected)
		var usedData = Chapters.find().fetch()[0].usedData;
		
		var usedDataIns = {
			dataType : 'family',
			dataText : selected,
		};
		console.log(usedData.length)
		for(var i = 0; i < usedData.length; i++) {
			if(usedData[i].dataText === selected) {
				usedDataIns = ''
			}
		}
		
		console.log(format)
		Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: 'family',
					format: selected,
					type: 'user',
					date: new Date()
				}
			}
		})
 	}
 })
Template.likes.events({
	'submit form': function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;
		console.log(selected)
		var usedData = Chapters.find().fetch()[0].usedData;
		
		var usedDataIns = {
			dataType : 'user',
			dataText : selected,
		};
		console.log(usedData.length)
		for(var i = 0; i < usedData.length; i++) {
			if(usedData[i].dataText === selected) {
				usedDataIns = ''
			}
		}
		
		console.log(format)
		Chapters.update(chapterId, {
			$addToSet: {
				usedData: usedDataIns,
				content: {
					 _id: new Meteor.Collection.ObjectID(),
					text: selected,
					type: 'user',
					date: new Date()
				}
			}
		})
 	}
})
//  edges
//  doen : friends, family likes movies
//  misschien:events, games, tagged_places, television

// fields
// doen: interested_in, political, religion, relationship_status, significant_other
// misschien: favorite_athletes, favorite_teams,, sports 
 
 
 
// Template.filters.helpers({
// 	chapterTitle() {
// 		var a = Chapters.findOne({_id: FlowRouter.getParam("chapterId")});
// 		return a.title
// 	},
// 	filters() {

// 		return Dataset.find({})
// 	},
// 	filtered() {
// 		console.log(Session.get('currentFilter'))
// 		return Session.get('currentFilter')
// 	},
// 	whichOne() {
// 		console.log(Session.get('currentFilter'))
// 		return Session.get('currentFilter')
// 	}
// })

// Template.filters.events( {
// 	'click #storySettings': function (e) {
// 		e.preventDefault();
// 		var target = document.querySelector('form.settings');
// 		console.log(target);
// 		target.classList.toggle('active');
// 	},
// 	'click .filter': function (e) {
// 		var links = document.querySelectorAll('.filter');
		
// 		for(var i = 0;i < links.length; i++) {
// 			links[i].classList.add('hideLinks')
// 		}
// 		Session.set('currentFilter', this.name);
// 	},
	
// })

// Template.weather.events({
// 	'submit .addVarWeather' : function (e) {
// 		e.preventDefault();
// 		var chapterId = FlowRouter.getParam("chapterId");
// 		var selected = e.currentTarget.type.value;
// 		console.log(selected);
// 		Chapters.update(chapterId, {
// 			$addToSet: {
// 				content: {
// 					 _id: new Meteor.Collection.ObjectID(),
// 					text: selected,
// 					type: 'weather',
// 					date: new Date()
// 				}
// 			}
// 		})
// 	}
// })

// Template.date.events({
// 	'submit .addVarDate' : function (e) {
// 		e.preventDefault();
// 		var chapterId = FlowRouter.getParam("chapterId");
// 		var selected = e.currentTarget.type.value;

// 		Chapters.update(chapterId, {
// 			$addToSet: {
// 				content: {
// 					 _id: new Meteor.Collection.ObjectID(),
// 					text: selected,
// 					type: 'date',
// 					date: new Date()
// 				}
// 			}
// 		})
// 	}
// })
// // db.Dataset.insert({
	
// //     "name" : "weather", 
// //     ""

// // })