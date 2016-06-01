Template.layout.helpers({
	isAdmin() {
	
		if(FlowRouter.current().route.group.name === 'admin') {
			return 'admin'
		}
		else {
			return'bla'
		}
		
	}
})