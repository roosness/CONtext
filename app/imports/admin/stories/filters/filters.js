import { Chapters, Dataset } from '../../../lib/collections.js';
Template.filters.onCreated(function () {
	var self = this;

	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleChapter', id);
	})
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
		var format = ["---", "v", "a", "v+a", "vl+a", "vl"];
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
			console.log('selected')
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
		console.log(e.currentTarget);
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
		
		var lastItem = a.content[a.content.length -1];
		console.log(lastItem)
		
		if(lastItem === undefined) {
			console.log('undefined!')
			Chapters.update(chapterId, {
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


			
		}
		else { 
			console.log(lastItem.type);
			var a = lastItem.type.toString();
			console.log(a);
			if(!(a === 'p')) {
			console.log('newParagraph === true;')
			var newParagraph = true;
			console.log(newParagraph)
			Chapters.update(chapterId, {
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
		}

		else {
			console.log('new paragraph = false');
			var newParagraph = false;
			console.log(newParagraph)
			Chapters.update(chapterId, {
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


		}
		}
		
		
		
		e.target.paragraph.value = ''
	},
});


Template.weather.events({
	'submit .addVarWeather' : function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;
		Chapters.update(chapterId, {
			$addToSet: {
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

 Template.person.events({
 	'change select': function (e) {
 		console.log('change');
 		console.log(e.currentTarget, e.currentTarget.parent, )
 		e.currentTarget.parentNode.classList.add('active')
 		
 	},
 	'submit form' : function (e) {
 		e.preventDefault();
		var chapterId = FlowRouter.getParam("id");
		var selected = e.currentTarget.type.value;

		Chapters.update(chapterId, {
			$addToSet: {
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