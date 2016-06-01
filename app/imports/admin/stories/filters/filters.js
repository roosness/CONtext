import { Chapters, Dataset } from '../../../lib/collections.js';
Template.filters.helpers({
	chapterTitle() {
		var a = Chapters.findOne({_id: FlowRouter.getParam("chapterId")});
		return a.title
	},
	filters() {

		return Dataset.find({})
	},
	filtered() {
		
		return Session.get('currentFilter')
	},
	whichOne() {
		return Session.get('currentFilter')
	}
})

Template.filters.events( {
	'click #storySettings': function (e) {
		e.preventDefault();
		var target = document.querySelector('form.settings');
		console.log(target);
		target.classList.toggle('active');
	},
	'click .filter': function (e) {
		var links = document.querySelectorAll('.filter');
		console.log(this)
		for(var i = 0;i < links.length; i++) {
			links[i].classList.add('hideLinks')
		}
		Session.set('currentFilter', this.name);
	},
	'submit .newParagraph' : function (e) {
		e.preventDefault();

		var chapterId = FlowRouter.getParam("chapterId");
		
		var a = Chapters.findOne({_id: FlowRouter.getParam("chapterId")});
		
		var lastItem = a.content[a.content.length -1];
		console.log(lastItem)
		
		if(lastItem === undefined) {

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
})

Template.weather.events({
	'submit .addVarWeather' : function (e) {
		e.preventDefault();
		var chapterId = FlowRouter.getParam("chapterId");
		var selected = e.currentTarget.type.value;
		console.log(selected);
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
		var chapterId = FlowRouter.getParam("chapterId");
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
// db.Dataset.insert({
	
//     "name" : "weather", 
//     ""

// })