import { Dataset, Chapters, getUserData } from '../lib/collections.js';

Template.story.onRendered(function () {
	
	
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
			// console.log(this.text)
			var settings = Template.parentData(1).settings
			 if(this.text === 'naam') {
			 	var text;
			 	
			 	console.log(settings.name.format)
			 	var userInfo = Meteor.user().services.facebook;
			 	console.log(userInfo.first_name + ' ' + userInfo.last_name)
			 	switch(settings.name.format) {
			 		case 'v':
			 			text = userInfo.first_name;
			 			break;
			 		case 'a':
			 			text = userInfo.last_name;
			 			break;
			 		case 'v+a':
						text = userInfo.first_name + ' ' + userInfo.last_name;
						break;
			 		case 'vl+a':
				 		text = userInfo.first_name.charAt(0) + '. ' + userInfo.last_name;
			 			break;
			 		case 'vl':
				 		text = userInfo.first_name.charAt(0) + '.';
			 			break;
			 		default: 
			 			text = 'naam';
			 	}
			 	return text







				
			}
		}
	},
})