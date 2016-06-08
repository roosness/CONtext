import { Chapters, Dataset, Tests } from '../lib/collections.js';
Template.admin.onCreated(function () {
	var self = this;
	Session.set('selectedTab', 'setupTest');
	Session.set('amountOfChapters', 0)
	self.autorun(function () {
		self.subscribe('getUserData');
		self.subscribe('Tests');
		self.subscribe('Chapters')
		self.subscribe('userList')
	})
})


Template.admin.helpers ({
	isActiveTab(tab) {
	
		if(tab === Session.get('selectedTab')) {

			return 'active'
		}
		else {
			return ;
		}
	},
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	},
	users () {
		console.log(Meteor.users.find({}))
		return Meteor.users.find({})
	},
	whichOne() {
		return Session.get('selectedTab')
	},
	numbers() {
		return 3
	}
})
Template.testSession.helpers({
	tests() {
		return Tests.find({});
	},
	isActiveTestSession () {
		
		if(Tests.find({"isActive":true}).count() > 0) {
			console.log('found')
			return true;
		}
		else {
			console.log('not found')
			return false
		}
	}, 
	test() {
		console.log(this)
		return Tests.find({"isActive":true}).fetch()[0]
	},
	title() {
		console.log(this)
	}
})

Template.admin.events({
	'click .tabs li' : function (e) {
		Session.set('selectedTab', e.currentTarget.id)
	}
})

Template.setupTest.helpers({
	chapters () {
		return Chapters.find({}, {sort: {date: -1}})
	},
	users () {
		
		return Meteor.users.find();
	},
	numbers() {
		
		
		var array = [];
		for (var i =0; i<Session.get('amountOfChapters'); i++) {

			array.push(i + 1)
			console.log(array)
		} 
		return array
		
	}
})
Template.setupTest.events({
	'mouseup #amountOfChapters, keyup #amountOfChapters': function (e) {
		Session.set('amountOfChapters', e.currentTarget.value);
	},
	'change .userlist': function (e) {
		console.log(e.currentTarget.id);
		if(e.currentTarget.checked) {

			document.getElementsByClassName(e.currentTarget.id)[0].classList.add('active')
		}
		else {
			document.getElementsByClassName(e.currentTarget.id)[0].classList.remove('active')
		}
	},
	'submit .setupTest' : function (e) {
		e.preventDefault();
		console.log('submit a new test')
		var inputs = document.querySelectorAll('.setupTest input[type="checkbox"]');
		var names = document.querySelectorAll('.setupTest label.top');
		var testUsers = [];
		var testId = new Meteor.Collection.ObjectID();
		var amount = document.querySelector('#amountOfChapters').value;
		var selectedStories = [];



		for(var i = 0; i<inputs.length;i++) {
					var selectedStories = [];
			if(inputs[i].checked) {
				

				var selectBox = document.querySelectorAll('select[class="'+inputs[i].id+'"]');
				

				for(var h = 0; h < selectBox.length; h++) {
					selectedStories.push(selectBox[h].value)
				}
				 
				testUsers.push({
					userName: names[i].innerHTML,
					userid: inputs[i].id,
					order: selectedStories
				})
				Meteor.users.update(inputs[i].id, {
					$set: {
						"profile.isTestUser": true,
						"profile.test": {
							testId: testId,
							order: selectedStories,
							isActive: false
						}
					}
				})
			}
		}
		console.log(selectedStories)
		var test = {
			
			isActive: false,
			title: document.querySelector('#testTitle').value || '',
			date: document.querySelector('input[type="date"]').value,
			users: testUsers,
			description: document.querySelector('textarea').value || '',
			amountOfChapters: amount
		}
		console.log(test)
		Tests.insert(test)
		e.currentTarget.reset()
		Session.set('selectedTab', 'testSession');

	},
})

Template.testSession.events({
	'submit form': function (e) {
		e.preventDefault();
		var testId = document.querySelector("select").value;
		var usersArray = Tests.find({_id: testId},{}).fetch()[0].users
		console.log(usersArray)
		for(var i = 0; i < usersArray.length;i++) {
			console.log(usersArray[i].userid)
			Meteor.users.update({
				_id: usersArray[i].userid
			}, {
				$set: {
					"profile.test.0.isActive": true
					}
				})
			

		};
		Tests.update({_id: testId}, {
			$set: {
				"isActive" : true
			}
		})
		

		
	}
})

Template.testHistory.helpers({
	tests() {
		return Tests.find({});
	}
})