import { Stories } from '../../../../lib/collections.js';

import './admin-story-editing.html'

Template.editStory.onRendered(function () {
		Session.set('editing', false);
		Session.set('verplaatsen', false);
		
	
	
})
Template.story.helpers({
	editable() {
		(Session.get('editing') === 'bewerken') ? true : false
	}
})
Template.editStory.helpers({
	
	isEditing() {
		
		if(Session.get('editing') || Session.get('verplaatsen')) {
			return true
			} else {
				return false
			}
		}
})

Template.adminStory.helpers({
	recreate() {
		if(Session.get('create')) {
			delete Session.keys['create']
			return true;
		} else {
			return false
		}
	}
})
Template.adminStory.events({
	'click .story p span, click .story p h4' : function (e) {
		var modus = Session.get('editing');
		if(modus === 'verwijderen') {
			var arr = Session.get('array') || [];
			var targetId = e.currentTarget.id;
			if(itemInArray(arr, targetId)) {
				arr.push(targetId)
				e.currentTarget.classList.add(Session.get('editing'))
			} else {
				arr.splice(arr.indexOf(targetId), 1);
				e.currentTarget.classList.remove(Session.get('editing'));
			}
			console.log(arr);
			Session.set('array', arr)
		}
		
	},
	'keydown .story p span, keydown .story p h4' : function (e) {
		var modus = Session.get('editing');
		if(modus === 'bewerken') {
			e.currentTarget.classList.add(modus);
			var arr = Session.get('array') || [];
			if(itemInArray(arr, e.currentTarget.id)) {
				arr.push(e.currentTarget.id)
				e.currentTarget.classList.add(Session.get('editing'))
			}
			Session.set('array', arr)
		}

	}
})
Template.editStory.events({
	'click #bewerken': function (e) {
		var text = document.querySelectorAll('.static');
		for(var i in text) {
			text[i].contentEditable = true
		}
	},
	'click #verplaatsen' : function (e) {
		Session.set('verplaatsen', true);
		createSortable()
	},
	'click #save': function (e) {
		var modus = Session.get('editing');
		var array = Session.get('array');
		var id     = FlowRouter.getParam("id");
		if(modus === 'verwijderen') {
			for(var i in array) {
				Meteor.call('story_content_remove', id, array[i])
			}
		} else if (modus === 'bewerken') {
			for(var i in array) {
				var editedItem = document.getElementById(array[i]);

				Meteor.call('story_content_update', id, array[i], editedItem.innerHTML);
				editedItem.classList.remove(modus)
			}
		} else if (modus === 'verplaatsen') {
			saveSortable();
			Session.set('verplaatsen', false)
		}
		Session.set('editing', false);
		delete Session.keys['array'];
		document.querySelector('article.story').classList.remove('editing');
	},
	'click #discard' : function (e) {

		var modus = Session.get('editing');
		var array = Session.get('array');
		for(var i in array) {
			document.getElementById(array[i]).classList.remove(modus);
		}
		if(modus === 'bewerken' || modus === 'verplaatsen') { Session.set('create', true)}
		Session.set('editing', false);
		Session.set('verplaatsen', false)
		delete Session.keys['array']
		document.querySelector('article.story').classList.remove('editing');

	},
	'click a.action': function (e) {
		Session.set('editing', e.currentTarget.id);
		document.querySelector('article.story').classList.add('editing');
	},
	'click a' : function (e) {
		e.preventDefault();
		console.log(e.currentTarget.id)
	}
})

var createSortable = function () {
	console.log('createSortable')
	var items = document.querySelector(".story p");
	console.log(items)
	var sort = Sortable.create(items, {
		animation: 500,
		sort: true
	})
	console.log(sort)
	
	Tracker.autorun(function (c) {
      var sessionData = Session.get('verplaatsen');
      
      if(!sessionData) {
      	sort.destroy();
      }
    
   });
}

var saveSortable = function (items) {
	var items = document.querySelector(".story p").children;
	var chapterId = FlowRouter.getParam("id");
	for(var i = 0; i  < items.length; i++) {
		var number = i + 1;
		Meteor.call('stories_order_update', chapterId, items[i].id, number)
	}
}

var itemInArray = function (array, item) {
	var index = array.indexOf(item);
	if(index === -1) {
		return true
	} else {
		return false
	} 
	
}
