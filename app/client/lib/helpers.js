
Template.registerHelper('formatDate', function(type){
	
	var date   = new Date(TimeSync.serverTime('', 2000));

	var months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'october', 'november', 'december'];
	var dagen = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

	var types = {
		'24': addZero(date.getHours()) + ':' + addZero(date.getMinutes()),
		'year': date.getFullYear(),
		'minute': addZero(date.getMinutes()),
		'hour': date.getHours(),
		'month': months[date.getMonth()],
		'day' :dagen[date.getDay()],
		'part' : getPart(date.getHours()),
		'day_part': dagen[date.getDay()] + getPart(date.getHours())

	}
	return types[type];

	
});
function getPart(curHr) {
	var part;
	if(curHr < 12 && curHr > 6) {
	      part = "ochtend";
	} else if (curHr < 18 ) {
	      part = "middag";
	} else if( curHr < 23 ) {
	      part = "avond"
	} else {
		part = "nacht"
	}
	return part
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}