import { Meteor } from 'meteor/meteor';

import { Stories, userData, Fallbacks, Tests } from '../lib/collections.js'


Meteor.publish('Stories', function() {
	return Stories.find({}, {sort: {date: -1}});
});

Meteor.publish('singleStory', function (id) {
	return Stories.find({_id: id})
})

Meteor.publish('userData', function (id) {
	return userData.find({_id: id});
})
Meteor.publish('Fallbacks', function () {
	return Fallbacks.find();
})
Meteor.publish('Tests', function () {
    return Tests.find();
})
Meteor.publish('userList', function(id) {
    return Meteor.users.find({}, {profile:1});
})
console.log(Tests.find().count() === 0);
if(Tests.find().count() === 0) {
    Tests.insert({numberOfChapters:3})
}
console.log(Fallbacks.find().count())
if(Fallbacks.find().count() === 0) {
	
var data = [{ 
    "category": "Family",
    "fallback": "Dirk Deloreis",
    "subcategory": "brother"
},
{ 
    "category": "Family",
    "fallback": "Julia Deloreis",
    "subcategory": "sister"
},
{ 
    "category": "Family",
    "fallback": "Conchita Deloreis",
    "subcategory": "mother"
},
{ 
    "category": "Family",
    "fallback": "Michael Deloreis",
    "subcategory": "father"
},
{ 
    "category": "likes",
    "fallback": "U2",
    "subcategory": "music"
},
{ 
    "category": "likes",
    "fallback": "katholiek",
    "subcategory": "religion"
},
{ 
    "category": "likes",
    "fallback": "D66",
    "subcategory": "political"
},
{ 
    "category": "likes",
    "fallback": "Sven Kramer",
    "subcategory": "favorite_athletes"
},
{ 
    "category": "likes",
    "fallback": "feyenoord",
    "subcategory": "favorite_teams"
},
{ 
    "category": "other",
    "fallback": "Android",
    "subcategory": "devices"
},
{ 
    "category": "location",
    "fallback": "Almkerk",
    "subcategory": "hometown"
},
{ 
    "category": "location",
    "fallback": "Amsterdam",
    "subcategory": "houseLocation"
},
{ 
    "category": "location",
    "fallback": "Amsterdam",
    "subcategory": "userLocation"
},
{ 
    "category": "user",
    "fallback": "Booking.com",
    "subcategory": "work"
},
{ 
    "category": "user",
    "fallback": "01-01-1991",
    "subcategory": "birthday"
},
{ 
    "category": "user",
    "fallback": "male",
    "subcategory": "geslacht"
},
{ 
    "category": "user",
    "fallback": "male",
    "subcategory": "interested_in"
},
{ 
    "category": "user",
    "fallback": "Hogeschool van Amsterdam",
    "subcategory": "education"
},
{ 
    "category": "user",
    "fallback": "single",
    "subcategory": "relationship_status"
},
{ 
    "category": "user",
    "fallback": "Frans Fransman",
    "subcategory": "significant_other"
},
{
    "category": "geslacht",
    "male": "zijn",
    "female": "haar"
}];
for(var i in data) { Fallbacks.insert(data[i])}
}