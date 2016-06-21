import { Chapters } from '../../../lib/collections.js';

Template.adminStory.events({
	
	
})

Template.adminStory.helpers({
	isAdmin() {
		return window.location.pathname.indexOf('admin') > -1;
	},
	rerender() {
		
		if(Session.get('rerender')) {
			removeAllSession();
			return true;
		} else {
			return false
		}
	}

})


Template.editing.helpers({
	isEditing() {
		return Session.get('editing')
	}
})
Template.story.helpers({
	editable() {
		if(Session.get('editing') === 'editing') {
			return true
		} else {
			return false
		}
		
	}
})
Template.adminStory.events ({
	'click .story p, click .story br, click .story h4' : function (e) {
		
		if(Session.get('editing') === 'deleting' ) {
			var sessionName = Session.get('editing') + 'Array';
			var arr = Session.get(sessionName) || [];
			
			
			if(itemInArray(arr, e.currentTarget.id)) {
				arr.push(e.currentTarget.id);
				e.currentTarget.classList.add(Session.get('editing'));
			} else {
				arr.splice(arr.indexOf(e.currentTarget.id), 1);
				e.currentTarget.classList.remove(Session.get('editing'));
			}
			console.log(arr)
			Session.set(sessionName, arr)
			
		}
	},
	'keydown .story p, keydown .story h4':function (e) {
		e.currentTarget.classList.add(Session.get('editing'));
	}
})
Template.editing.events({
	'click ul a': function (e) {
		e.preventDefault();
		if(!Session.get('editing')) {
			Session.set('editing', e.currentTarget.id)
		}
	},
	'click ul #save': function (e) {
		e.preventDefault();
		var popup = document.querySelector('.popup.confirm');
		popup.classList.add('active')
	}, 
	'click ul #discard': function(e) {
		discardChanges();
	}
})

Template.popupConfirm.events({
	'click button': function (e) {
		e.preventDefault();
		var id = FlowRouter.getParam("id");
		if(JSON.parse(e.currentTarget.value) && Session.get('editing') === 'deleting') {
			Meteor.call('removeContent', id, Session.get('deletingArray'), function () {	
			});
			removeAllSession();
		} else if(JSON.parse(e.currentTarget.value) && Session.get('editing') === 'editing') { 
			var editedItems = document.getElementsByClassName(Session.get('editing'));
			console.log(editedItems)
			for(var i = 0; i < editedItems.length; i++) {
				Meteor.call('updateContent', id, editedItems[i].id, editedItems[i].innerHTML);
				console.log(id, editedItems[i].id, editedItems[i].innerHTML)
				editedItems[i].classList.remove(Session.get('editing'));
				removeAllSession();
			}
			

		}else {
			console.log('false');
			discardChanges();
			

		}
		document.querySelector('.popup.confirm').classList.remove('active');
			
	}
});
var discardChanges = function() {
	
	var sessionName = Session.get('editing') + 'Array';
	var arr = Session.get(sessionName) || [];
	console.log(arr)
	for(i = 0; i < arr.length;i++) {
		document.getElementById(arr[i]).classList.remove(Session.get('editing'));
	};
	Session.set('rerender', true);
	
}
var removeAllSession=  function () {
	Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); })
	Session.keys = {}
}
var itemInArray = function (array, item) {
	var index = array.indexOf(item);
	if(index === -1) {
		return true
	} else {
		return false
	} 
	
}