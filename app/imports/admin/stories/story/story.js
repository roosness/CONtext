import { Chapters } from '../../../../lib/collections.js';

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
			
		} else if(Session.get('editing') === 'move') {
			Session.set('movingBlock', e.currentTarget.id)
		}
	},
	'keydown .story p, keydown .story h4':function (e) {
		var allItems = document.querySelectorAll
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
		cleanUp();
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

Template.adminStory.events({
	'click  .story .movingAround li' : function (e) {
		e.preventDefault();

		var id = FlowRouter.getParam('id');
		var number = this.order;
		var contents = Chapters.find().fetch()[0].content
		var array = [];
		if(e.currentTarget.classList.contains('up') && number > 1) {
			console.log('up' );
			for(var i = 0; i < contents.length; i++) {
				console.log(contents[i].order, (number - 1))

				if(contents[i].order === (number - 1)) {
					Meteor.call('changeOrder', contents[i]._id._str, id, number);
				}
			}
			number--

		} else if(e.currentTarget.classList.contains('down') && number < contents.length) {
			console.log('down');
			for(var i = 0; i < contents.length; i++) {
				console.log(contents[i].order, (number + 1))

				if(contents[i].order === (number + 1)) {

					Meteor.call('changeOrder', contents[i]._id._str, id, number);
				}
			}
			number++
		}
		console.log(id,  e.currentTarget.id , number)
		
		Meteor.call('changeOrder', e.currentTarget.parentNode.id, id, number);

		
		
	}
})


var cleanUp = function () {
	console.log('lets get some cleaning goin"!')
	var id = FlowRouter.getParam("id");
	var contents = Chapters.findOne().content
	var dataset =  _.sortBy(contents, function (content) { return content.order});
	var arr = [];
	for(var i = 0; i < dataset.length; i++) {
		if(dataset[i].content === '' || dataset[i].content === ' ') {
			arr.push(dataset[i]._id._str)
		}
	}
	var childeren = document.querySelectorAll('.story section p').length + document.querySelectorAll('.story section br').length + document.querySelectorAll('.story section h4').length;
	console.log(childeren);
	for(var i = 0; i < childeren ;i++) {
		Meteor.call('changeOrder', dataset[i]._id._str, id, i + 1)
	}
}
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
var removeCLass = function (classname) {
	for(var i = 0; i<classname.length;i++) {
		var selected = document.querySelectorAll('.' + classname[i]);
			for(var x = 0; x < selected.length; x++) {
				selected[x].classList.remove(classname[i])
			 
			}
	}
}