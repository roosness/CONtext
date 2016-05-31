import { Chapters, Dataset } from '../../lib/collections.js';
Template.adminChapter.onCreated(function () {
 	var day = new Date();
 	Session.set('date', day)
});

Template.adminChapter.helpers({
	chapter () {
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
	time() {
		var thisTime   = new Date(TimeSync.serverTime());
		return thisTime
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

				var curHr = date.getHours();

				if(curHr<12){
			      return ("ochtend")
				}else if(curHr<18){
			      return ("middag")
				}else if(curHr<24){
			      return ("avond")
				}else {
				return('nacht')
				}

			}
			else if (this.text === 'month') {
				return date.toLocaleDateString('nl-NL', { month: 'long'});
			}
			
		}
	}

})