import { Chapters, Dataset } from '../lib/collections.js';
Template.admin.onRendered (function(){
	console.log(Roles.userIsInRole())
	console.log(FlowRouter.current().route.group)
	if(FlowRouter.current().route.group) {
			if(FlowRouter.current().route.group.name === 'admin') {
				console.log('admin')
				return 'admin'
			}
			
		}
		else {
			return'bla'
		}
		
})
Template.admin.helpers ({
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	},
	users () {
		console.log(Meteor.users.find({}))
		return Meteor.users.find({})
	}
})
Template.admin.events({
	'submit .newChapter' : function (event) {
		event.preventDefault();
		console.log((Chapters.find({}).count() )+ 1)
		Chapters.insert({
			number: (Chapters.find({}).count() )+ 1,
			title: event.target.title.value.trim(),
			date: new Date(),
			content: []
		})
	},
	'submit .addToTest': function (event) {
		event.preventDefault();
		
	}
})