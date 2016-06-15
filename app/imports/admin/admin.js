import { Chapters, Dataset, Tests } from '../lib/collections.js';
Template.admin.onCreated(function () {
	var self = this;
	Session.set('selectedTab', 'testSession');
	
	self.autorun(function () {
		self.subscribe('getUserData');
		self.subscribe('Tests');
		self.subscribe('Chapters');
		self.subscribe('userList')
	})
})
Template.admin.onRendered(function () {
	Session.set('amountOfChapters', 1)
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
					userid: inputs[i].id,
					order: selectedStories
				})
				Meteor.call('userTest', inputs[i].id, true, false, selectedStories, function (err, res) {
					console.log(err, res)
				} )
				
				
			}
			

		}
		
		Tests.update({_id: id}, {
			"numberOfChapters": Number(number),
			"testusers": testusers
		})
	}
})

Template.testSession.events({
	'click button': function (e) {
		e.preventDefault();
		var testingUsers = [];
		var testUsersObj = Tests.find().fetch()[0].testusers;

		for(var i = 0;i<testUsersObj.length;i++) {
			console.log(testUsersObj[i].userid);
			Meteor.call('startTest_user', testUsersObj[i].userid, true)

		}


	}
})