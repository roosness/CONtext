Template.registerHelper( 'realTime', (time) => {
	var date = new Date(time);
		return date.toLocaleDateString('nl-NL', {  month: 'long', day: 'numeric' })
});