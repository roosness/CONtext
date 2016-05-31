import { Dataset, Chapters } from '../lib/collections.js';

Template.story.onRendered(function () {
	
	
})


Template.story.helpers({
	chapter() {
		console.log(FlowRouter.getParam("chapterId"))
		return Chapters.findOne({_id: FlowRouter.getParam("chapterId")})
	},
	istext () {
		
		if(this.type === 'p') {
			// var id =  this._id._str;
			// var item = document.getElementById(id);
			// console.log(its)

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

			Meteor.call('getWeather',this.text, function (err, res) {
				Meteor.call('calcWeather', res.weather[0].id, this.text, function (err, res) {
					Session.set('weatherWord', res)
				})
				
			});
			
			return Session.get('weatherWord');
		}
		else if (this.type === 'date') {
			var date   = new Date(TimeSync.serverTime());
			var value;
			if(this.text === 'day') {
				 return date.toLocaleDateString('nl-NL', { weekday: 'long'});
				 console.log(value)
			}
			else if(this.text === 'part') {

				var curHr = date.getMinutes();

				if(curHr<10){
			      return ("ochtend")
				}else if(curHr<18){
			      return ("middag")
				}else if(curHr<52){
			      return ("avond")
				}else {
				return('nacht')
				}

			}
			else if (this.text === 'month') {
				return date.toLocaleDateString('nl-NL', { month: 'long'});
			}
			
		}
	},
})