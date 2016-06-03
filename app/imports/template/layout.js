Template.layout.helpers({
	isAdmin() {
		
		if(FlowRouter.current().route.group) {
			return 'admin'
		}
		else {
			return'bla'
		}
		
	}
})