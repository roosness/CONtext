Template.user.events({
	'click .logout' : function (e) {
		e.preventDefault();
		Meteor.logout();
		FlowRouter.redirect('/')
	}
})