Template.registerHelper( 'realTime', (time) => {
	var date = new Date(time);
		return date.toLocaleDateString('nl-NL', {  month: 'long', day: 'numeric' })
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