import { Tests, Stories } from '../../../lib/collections.js';
import './admin-tests.html'
Template.adminTests.onCreated(function () {
	Session.set('selectedTab', 'testSession');
	var self = this;
	self.autorun(function () {
		self.subscribe('Tests', {
			onReady: function () {
				var num = Tests.find().fetch()[0].numberOfChapters || 2;
				console.log(num)
				Session.set('numberOfChapters', num)
			}
		});
		self.subscribe('userList');
		self.subscribe('Stories');
	})
})
Template.adminTests.helpers({
	isActiveTab(tab) {
		return (tab === Session.get('selectedTab')) ? 'active' : false
	},
	whichOne () {
		return Session.get('selectedTab')
	},
	test () {
		return Tests.find().fetch()[0]
	},

})
Template.adminTests.events({
	'click a': function (e) {
		e.preventDefault();
		Session.set('selectedTab', e.currentTarget.id)
	}
})
Template.testSession.helpers({
	numberOfChapters() {
		return Session.get('numberOfChapters')
	},
	testusers() {
		console.log(this)

		if(this.testusers === undefined || this.testusers.length === 0) {
			Session.set('selectedTab', 'testConfig')
		}
		return this.testusers
	},
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
	currentRead(index, userid) {	
		var user = Meteor.users.find(userid).fetch()[0];
		// console.log(index, user.profile.currentStory, user.profile.testActive);
		// return (index === user.profile.currentStory && user.profile.testActive) ? 'currentStory' : false;
		return (index === user.profile.currentStory && user.profile.testActive) ? 'currentStory' : false;
	},
	index(number) {
		return number + 1;
	}
})
Template.testConfig.helpers({
	user () {
		return Meteor.users.find({})
	},
	numberNumberOfChapters() {
		return Session.get('numberOfChapters')
	},
	numberOfChapters() {
		var arr = [];
		for(var i = 0; i < Session.get('numberOfChapters');i++) {
			arr.push(i + 1)
		}
		return arr
	},
	stories() {
		return Stories.find().fetch()
	}
})

Template.testSession.events({
	'click button': function (e) {
		e.preventDefault();

		var testUsersObj = Tests.find().fetch()[0].testusers;
		var userid = e.currentTarget.id;
		var id = Tests.find().fetch()[0]._id
		var active;
		for(var i = 0; i < testUsersObj.length; i++) {
			if(testUsersObj[i].userid === userid) {
				Meteor.call('init_test', userid, id, !(testUsersObj[i].userTestActive))		
			}
		}
	}
})

Template.testConfig.events({
	'change input[type="number"]': function (e){
		Session.set('numberOfChapters', e.currentTarget.value)
	},
	'submit form' : function (e) {
		e.preventDefault();
		var number = document.querySelector('input[type="number"]').value;
		var inputs = document.querySelectorAll('.testConfig input[type="checkbox"]');
		var names = document.querySelectorAll('.testConfig label.name');
		console.log(inputs, names)
		var testusers = [];
		for(var i = 0; i<inputs.length;i++) {
			if(inputs[i].checked) {
				var selectedStories = [];
				var selectBox = document.querySelectorAll('select[class="'+inputs[i].id+'"]');

				for(var h = 0; h<selectBox.length;h++) {
					
					var value = selectBox[h].value.split('-');
					selectedStories.push({
						id: value[0],
						title: value[1],
						order: (h + 1)
					})
				}
				
				testusers.push({
					userName: names[i].innerHTML,
					userTestActive: false,
					userid: inputs[i].id,
					currentStory: 0,
					order: selectedStories
				})
			}
		}
		Meteor.call('Test_update', number, testusers);
		Session.set('selectedTab', 'testSession');
	}
})