import { Chapters, Dataset, Tests } from '../lib/collections.js';
Template.admin.onCreated(function () {
	var self = this;
	Session.set('selectedTab', 'testSession');
	
	self.autorun(function () {
		self.subscribe('getUserData');
		self.subscribe('Tests', {
			onReady: function () { 
				var num = Tests.find().fetch()[0].numberOfChapters
				Session.set('amountOfChapters', Tests.find().fetch()[0].numberOfChapters);

			}
		});
		self.subscribe('Chapters');
		self.subscribe('userList')
	})
})

Template.admin.events({
	'click .tabs li' : function (e) {
		Session.set('selectedTab', e.currentTarget.id)
	}
})
Template.admin.helpers({
	
	isActiveTab() {
		return Session.get('selectedTab')
	},
	whichOne () {
		return Session.get('selectedTab')

	},
	isActiveTab(tab) {
	
		if(tab === Session.get('selectedTab')) {

			return 'active'
		}
		else {
			return ;
		}
	},
	
})
Template.testplan.helpers({
	test() {

		return Tests.find().fetch()[0]
	},
	index(number) {
		return number + 1;
	}	
})

Template.testConfig.helpers({
	test() {

		return Tests.find().fetch()[0]
	},
	user () {
		
		return Meteor.users.find({})
	},
	isSelected(id) {
		
		var arr = Tests.find().fetch()[0].testusers;
		for(var i = 0; i<arr.length;i++) {
			
			if(arr[i].userid === id) {
				
				return 'checked'
			}
		}
	},
	numbers() {
		var arr = [];
		
		var number = Session.get('amountOfChapters');
		for(var i = 0; i < number; i++) {
			
			arr.push(i + 1)
		}
		
		return arr;
	},
	chapters() {
		
		return Chapters.find().fetch()
	}
})

Template.testConfig.events({
	'mouseup #amountOfChapters, keyup #amountOfChapters': function (e) {
		console.log(e.currentTarget.value)
		Session.set('amountOfChapters', e.currentTarget.value);
	},
	'submit form': function (e) {
		e.preventDefault();


		var number = document.querySelector('input[type="number"]').value;
		var id = new Meteor.Collection.ObjectID('575805a3a16c63aebdcf8576');
		var inputs = document.querySelectorAll('.testConfig input[type="checkbox"]');
		var names = document.querySelectorAll('.testConfig label.name');

		var testusers = [];
		for(var i = 0; i<inputs.length;i++) {
			if(inputs[i].checked) {
				var selectedStories = [];
				var selectBox = document.querySelectorAll('select[class="'+inputs[i].id+'"]');
				for(var h = 0; h < selectBox.length; h++) {
					
					var value = selectBox[h].value.split('-');
					console.log(value)
				
					selectedStories.push({
						id: value[0],
						title: value[1],
						order: (h + 1)
					})
				}
				console.log(selectedStories)
				testusers.push({
					userName: names[i].innerHTML,
					userTestActive: false,
					userid: inputs[i].id,
					currentStory: 0,
					order: selectedStories
				})
				Meteor.call('userTest', inputs[i].id, true, false, selectedStories, 0)
				
				
			}
			

		}
		
		Tests.update({_id: id}, {
			"numberOfChapters": Number(number),
			"testusers": testusers,
			"isActive": false
		})

		Session.set('selectedTab', 'testSession');
	}
})
Template.testSession.helpers({
	isActiveButton(id) {
		var test = Tests.find().fetch()[0];
		var text;
		for(var i = 0; i < test.testusers.length;i++) {
			
			if((test.testusers[i].userid === id) && (test.testusers[i].userTestActive === true)) {
				text = 'stop'
			}
			else {
				text = 'start'
			}
		}
		return text
	},
	test() {

		return Tests.find().fetch()[0]
	},
	index(number) {
		return number + 1;
	}
})

// var id = new Meteor.Collection.ObjectID('575805a3a16c63aebdcf8576');
// 	Meteor.call('stopTest_user', Meteor.userId(), false, 0);
// 	Meteor.call('stopTest_test', id, Meteor.userId(), false, 0);
Template.testSession.events({
	'click button': function (e) {
		e.preventDefault();


		var testUsersObj = Tests.find().fetch()[0].testusers;
		
		var userid = e.currentTarget.id;
		var active;
		for(var i = 0; i < testUsersObj.length; i++) {

			if(testUsersObj[i].userid === userid) {
				console.log(testUsersObj[i].userTestActive)
				active = !(testUsersObj[i].userTestActive) 
				
			}
		}
			var id = new Meteor.Collection.ObjectID('575805a3a16c63aebdcf8576');
		console.log(active)	
		var number = 0;
		if(active === false) {
			console.log('stop de test')
			Meteor.call('startTest_user', userid, active, number)
			Meteor.call('startTest_test', id, userid, active, number)
			
		}
		else {
			console.log('start de test')
			Meteor.call('startTest_user', userid, active, number)
			Meteor.call('startTest_test', id, userid, active, number)
		}
		
	
	

		



	}
})