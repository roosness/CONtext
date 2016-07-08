Template.adminLayout.helpers({
	isAdmin() {
		console.log(Roles.userIsInRole( Meteor.userId(), 'admin' ))
		return Roles.userIsInRole( Meteor.userId(), 'admin' )
	},
	isActiveRoute(route) {
		if(FlowRouter.getRouteName() === route) {
			return 'active'
		} else {
			return false
		}
	}
})

Template.adminLayout.onCreated(function () {
	document.querySelector('body').classList.add('admin')
})