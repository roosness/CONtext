

Template.registerHelper( 'realTime', (time) => {
	var time = new Date();
	var date = new Date(time);
		return date.toLocaleDateString('nl-NL', {  month: 'long', day: 'numeric', second: 'numeric' })
});

Template.registerHelper('selected', function(option, value){
	console.log(option, value)
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
});

Template.registerHelper('testhelper', function (a, b) {
	console.log(a);
	console.log(b)
})
var userFormat = function (text, format) {
	
	if(text === 'naam') {
		var name;


		 	Meteor.call('fb_me', ',first_name,last_name', function (err, res) {
		 		console.log(res.data.first_name)
		 		Session.set('user_name_first', res.data.first_name);
		 		Session.set('user_name_last', res.data.last_name)
		 	})
		 	console.log(format)
		 	switch(format) {
		 		case 'v':
		 			name = Session.get('user_name_first')
		 			break;
		 		case 'a':
		 			name = Session.get('user_name_last')
		 			break;
		 		case 'v+a':
					name = Session.get('user_name_first') + ' ' + Session.get('user_name_last');
					break;
		 		case 'vl+a':
		 			var name = Session.get('user_name_first')
			 		name = name.charAt(0) + '. ' + Session.get('user_name_last');
		 			break;
		 		case 'vl':
		 		var name = Session.get('user_name_first');

			 		name = name.charAt(0) + '.';
		 			break;
		 		default: 
		 			name = Session.get('user_name_first');;
		 	}
		 	console.log(name)
		 	return name	
		}
	if(text === 'music') {
		Meteor.call('fb_me', ',music', function (err, res) {
					if(err) {
						console.log(err)
					}
					else {
					
						Session.set('music',res.data.music.data[0].name)
					}
				})
				return Session.get('music')
	}
}

Template.registerHelper('getVar', function (type, text, format) {
	if(type === 'user') {

		var result = userFormat(text, format);
		return result
	}


	


})
