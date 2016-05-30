Template.loginRegister.onCreated(function () {
	
})
Template.loginRegister.helpers({
	
})
Template.register.events({
	'click #login' : function (e) {
		e.preventDefault();
		var loginWrapper = document.querySelector('.login-wrapper');
		var registerWrapper = document.querySelector('.register-wrapper');

		loginWrapper.classList.add('active');
		registerWrapper.classList.remove('active')
		

	},
    'submit .register': function(e){
        e.preventDefault();
        console.log('submit')
        var email = document.querySelector('input[name=email].register').value;
        var password = document.querySelector('input[name=password].register').value;
        var message = document.querySelector('.register.message');

        console.log(email, password);

       Accounts.createUser({
		    email: email,
		    password: password
		}, function(error){
		     if(error){
		        console.log(error.reason);
		        message.classList.remove('hide')
		        message.innerHTML = error.reason;
		    } else {
		        FlowRouter.redirect('/stories')
		    }
		});
        
    }
});

Template.loginlogout.events({
	'click .logout' : function (e) {
		e.preventDefault();
		Meteor.logout();
		FlowRouter.redirect('/')
	}
})


Template.login.events({
	'click #register' : function (e) {
		e.preventDefault();
		var loginWrapper = document.querySelector('.login-wrapper');
		var registerWrapper = document.querySelector('.register-wrapper');

		loginWrapper.classList.remove('active');
		registerWrapper.classList.add('active')
		

	},
    'submit .login': function(e){
        e.preventDefault();
        console.log('login')
		var email = document.querySelector('input[name=email].login').value;
		var password = document.querySelector('input[name=password].login').value;
		var message = document.querySelector('.login.message');
		Meteor.loginWithPassword(email, password, function(error){

		    if(error){
		        message.classList.remove('hide')
		        message.innerHTML = error.reason;
		        console.log(error.reason);
		    } else {
		        FlowRouter.redirect('/stories')
		    }
		});
    }
});

