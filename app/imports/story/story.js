import { Dataset, Chapters, getUserData } from '../lib/collections.js';

Template.story.onRendered(function () {
	
	Meteor.call('fb_me', function(err, res) {
	      if (!err) {
	      	console.log(res.data)
	      }
	       
	    });
})


Template.story.helpers({
	chapter() {
		console.log(FlowRouter.getParam("chapterId"))
		return Chapters.findOne({_id: FlowRouter.getParam("chapterId")})
	},
	istext () {
		
		if(this.type === 'p') {
			return true;
		}
		else {
			return false;
		}
	},
	isDone() {
		

		if(this.type === 'p') {
			if(this.newPar) {
			return 'connect'
		}
		else {
			return 'newPar'
		}
		}
		else {
			return false
		}
		
		
		
	},
	vars () {
		if(this.type === 'weather') {
			
			if(this.text === 'word') {
			
				Meteor.call('getWeather',this.text, function (err, res) {
					
				Meteor.call('calcWeather', res.weather[0].id, this.text, function (err, res) {
					Session.set('weatherWord', res)
				})
				
			});
				return Session.get('weatherWord');
			}
			else if(this.text === 'degrees') {
				
				Meteor.call('getWeather',this.text, function (err, res) {
				Session.set('weatherDeg', res.main.temp)
				
			});
				return Session.get('weatherDeg');
			}
			
			
			
		}
		else if (this.type === 'date') {
			var date   = new Date(TimeSync.serverTime());
			var value;
			if(this.text === 'day') {
				 return date.toLocaleDateString('nl-NL', { weekday: 'long'});
				 console.log(value)
			}
			else if(this.text === 'part') {

				var curHr = date.getHours();

				if(curHr<12){
			      return ("ochtend")
				}else if(curHr<18){
			      return ("middag")
				}else if(curHr<23){
			      return ("avond")
				}else {
				return('nacht')
				}

			}
			else if (this.text === 'month') {
				return date.toLocaleDateString('nl-NL', { month: 'long'});
			}
			
		}
		if(this.type === 'user') {
			
			var settings = Template.parentData(1).settings
			 if(this.text === 'naam') {
			 	var text;


			 	Meteor.call('fb_me', ',first_name,last_name', function (err, res) {

			 		Session.set('user_name_first', res.data.first_name);
			 		Session.set('user_name_last', res.data.last_name)
			 	})
			 	
			 	switch(settings.name.format) {
			 		case 'v':
			 			text = Session.get('user_name_first')
			 			break;
			 		case 'a':
			 			text = Session.get('user_name_last')
			 			break;
			 		case 'v+a':
						text = Session.get('user_name_first') + ' ' + Session.get('user_name_last');
						break;
			 		case 'vl+a':
			 			var name = Session.get('user_name_first')
				 		text = name.charAt(0) + '. ' + Session.get('user_name_last');
			 			break;
			 		case 'vl':
			 		var name = Session.get('user_name_first');

				 		text = name.charAt(0) + '.';
			 			break;
			 		default: 
			 			text = 'naam';
			 	}
			 	return text







				
			}
		}
	},
})