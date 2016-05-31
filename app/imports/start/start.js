Template.start.onCreated(function () {
	
	if(Meteor.userId()){
		FlowRouter.redirect('/stories')
	};

})
Template.start.events({
	'click .fingerprint': function (e) {
		var wrapper = document.querySelector('.start-wrapper');
		wrapper.classList.toggle('showLogin');
	}
})

Template.start.helpers({
	
})