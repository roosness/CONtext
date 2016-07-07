import './user.html'

Template.user.onCreated(function () {
	console.log('created')
})

Template.user.events({
	'click .logout' : function (e) {
		e.preventDefault();
		Meteor.logout();
		FlowRouter.go('/login')
	}
})