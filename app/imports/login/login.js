import { Meteor } from 'meteor/meteor';

Template.loginRegister.onCreated(function () {
	
})
Template.loginRegister.helpers({
	
})
Template.register.events({
	'click #facebook-register': function(event) {
        Meteor.loginWithFacebook({
        	requestPermissions: ['public_profile',
'user_friends',
'email',
'user_about_me',
'user_actions.books',
'user_actions.fitness'
,'user_actions.music'
,'user_actions.news'
,'user_actions.video'
// ,'user_actions:{app_namespace}'
,'user_birthday'
,'user_education_history'
,'user_events'
,'user_games_activity'
,'user_hometown'
,'user_likes'
,'user_location'
,'user_managed_groups'
,'user_photos'
,'user_posts'
,'user_relationships'
,'user_relationship_details'
,'user_religion_politics'
,'user_tagged_places'
,'user_videos'
,'user_website'
,'user_work_history'
,'read_custom_friendlists'
,'read_insights'
,'read_audience_network_insights'
,'read_page_mailboxes'
,'manage_pages'
,'publish_pages'
,'publish_actions'
,'rsvp_event'
,'pages_show_list'
,'pages_manage_cta'
,'pages_manage_instant_articles'
,'ads_read'
,'ads_management'
,'pages_messaging'
,'pages_messaging_phone_number' ],
        }, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            else {
            	FlowRouter.redirect('/stories')
            }
             
        });
    },
	'click #login' : function (e) {
		e.preventDefault();
		var loginWrapper = document.querySelector('.login-wrapper');
		var registerWrapper = document.querySelector('.register-wrapper');

		loginWrapper.classList.add('active');
		registerWrapper.classList.remove('active');
		

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
	'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({
        	requestPermissions: ['public_profile',
'user_friends',
'email',
'user_about_me',
'user_actions.books',
'user_actions.fitness'
,'user_actions.music'
,'user_actions.news'
,'user_actions.video'
// ,'user_actions:{app_namespace}'
,'user_birthday'
,'user_education_history'
,'user_events'
,'user_games_activity'
,'user_hometown'
,'user_likes'
,'user_location'
,'user_managed_groups'
,'user_photos'
,'user_posts'
,'user_relationships'
,'user_relationship_details'
,'user_religion_politics'
,'user_tagged_places'
,'user_videos'
,'user_website'
,'user_work_history'
,'read_custom_friendlists'
,'read_insights'
,'read_audience_network_insights'
,'read_page_mailboxes'
,'manage_pages'
,'publish_pages'
,'publish_actions'
,'rsvp_event'
,'pages_show_list'
,'pages_manage_cta'
,'pages_manage_instant_articles'
,'ads_read'
,'ads_management'
,'pages_messaging'
,'pages_messaging_phone_number' ],
        }, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            else {
            	FlowRouter.redirect('/stories')
            }
             
        });
    },
	
	'click #register' : function (e) {
		e.preventDefault();
		console.log('go to register')
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

