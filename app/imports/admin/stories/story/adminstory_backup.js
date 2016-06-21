import { Chapters } from '../../../lib/collections.js';

Template.adminStory.events({
	'click  .story p, click .story br, click .story h4': function (e) {
		if(Session.get('editing') === 'deleting') {
			
			var array = Session.get('aboutToBeDeleted') || [];
			
			if(e.currentTarget.classList.contains('aboutToBeDeleted')) {
				e.currentTarget.classList.remove('aboutToBeDeleted');
				var index = array.indexOf(e.currentTarget.id);
				array.splice(index, 1)

			} else {
				e.currentTarget.classList.add('aboutToBeDeleted');
				array.push(e.currentTarget.id);
			}
			
			Session.set('aboutToBeDeleted', array);

		}  else if(Session.get('editing') === 'editing') {

			e.currentTarget.classList.add('aboutToBeEdited');
			var array = Session.get('aboutToBeEdited') || [];
			
			
			if(array.indexOf(e.currentTarget.id) < 0) {
				array.push(e.currentTarget.id);
			}
			e.currentTarget.contentEditable = true;
			Session.set('aboutToBeEdited', array);

		}
		
	},
	
})

Template.adminStory.helpers({
	isAdmin() {
		return window.location.pathname.indexOf('admin') > -1;
	},

})

Template.editing.events({
	'click #deleting, click #editing, click #move':function (e) {
		e.preventDefault();
		document.querySelector('.admin-edit-story-wrapper').classList.add(e.currentTarget.id);
		Session.set('editing', e.currentTarget.id);
		
		

	},

	'click #discard':function (e) {
		e.preventDefault();
		document.querySelector('.admin-edit-story-wrapper').classList.remove('editing', 'deleting');
		Session.set('editing', false);
		var allText  = document.querySelectorAll('article p p');
		
		for(var i = 0; i < allText.length; i++) {
			
			allText[i].contentEditable = false
		}

		removeCLass(['editing', 'deleting', 'aboutToBeDeleted', 'aboutToBeEdited', 'move'])
		Template.story.render.apply()
		
		delete Session.keys.aboutToBeDeleted

	},
	'click #save': function (e) {
		e.preventDefault();
		var allText  = document.querySelectorAll('article p, article h4');
		
		for(var i = 0; i < allText.length; i++) {
			allText[i].contentEditable = false
		}
		var popup = document.querySelector('.popup.confirm');
		popup.classList.add('active')
		if(Session.get('issure') === true && Session.get('editing') === 'deleting') {
			clearSessions('issure')
			Meteor.call('removeContent', FlowRouter.getParam("id"), Session.get('aboutToBeDeleted'), function () {
					updateOrder();
				});
		} else if(Session.get('issure') === true&& Session.get('editing') === 'editing') {
			clearSessions('issure')
			var newContent = [];
				var session = Session.get('aboutToBeEdited');
				for(var i = 0; i<session.length;i++) {
					newContent.push(document.getElementById(session[i]).innerHTML)
				}
				Meteor.call('updateContent', FlowRouter.getParam("id"), Session.get('aboutToBeEdited'), newContent)
		} else if (Session.get('issure') === false) {
			clearSessions('issure')
		}

		removeCLass(['editing', 'deleting', 'aboutToBeDeleted', 'aboutToBeEdited', 'move'])
		
		
		// delete Session.keys.aboutToBeDeleted;
		// delete Session.keys.aboutToBeEdited;
		
		Session.set('editing', false);
		
	}
	
})

var clearSessions = function() {
	consoleconsole.log('clear')
	Object.keys(Session.keys).forEach(function(key){
        Session.set(key, undefined);
      });
      Session.keys = {} 
}

var updateOrder= function () {
	console.log('updateOrder')
	var items = document.querySelectorAll('.story p, .story br, .story h4');
	console.log(items)
	Meteor.call('changeOrders', items, FlowRouter.getParam("id"), function (err, res) {
		console.log(err,res)
	}) 
	console.log(items)
	// var arr = [];
	// for(var i = 0; i < items.length; i++) {
	// 	if(items[i].nodeName === 'P' || items[i].nodeName === 'H4' || items[i].localName === 'br'  ) {
	// 		console.log(items[i])
	// 		arr.push(items[i])
	// 	}
	// }

	// Meteor.call('changeOrders', arr, FlowRouter.getParam("id"), function (err, res) {
	// 	console.log(err,res)
	// }) 
}

var removeCLass = function (classname) {
	
	for(var i = 0; i<classname.length;i++) {
		var selected = document.querySelectorAll('.' + classname[i]);
			for(var x = 0; x < selected.length; x++) {
				selected[x].classList.remove(classname[i])
			 
			}
	}
}


Template.editing.helpers({
	isEditing() {
		return Session.get('editing')
	}
})

Template.popupConfirm.events({
	'click button': function (e) {
		
		Session.set('issure', JSON.parse(e.currentTarget.value));
		var popup = document.querySelector('.popup.confirm');
		popup.classList.remove('active')

	}, 
	'closeDuplicate': function (e) {
		Session.set('issure', false);
		var popup = document.querySelector('.popup.confirm');
		popup.classList.remove('active')
	}
})
