import { Meteor } from 'meteor/meteor';

import { Chapters, Tests, Filters, Userdata, Fallbacks } from '../imports/lib/collections.js'

import '../imports/lib/methods.js'

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1713199082273703',
    secret: '53f58b34d62a2e6c4b536f6de1c8b44b',

});

Meteor.publish('Userdata', function (id) {
	return Userdata.find({_id:id})
})
Meteor.publish('Fallbacks', function () {
	return Fallbacks.find({})
})
Meteor.publish('Chapters', function() {
	return Chapters.find({});
});

Meteor.publish('singleChapter', function(id) {
	return Chapters.find({_id: id})
});

Meteor.publish('Filters', function () {
	return Filters.find({})
})

Meteor.publish('userList', function(id) {
	return Meteor.users.find({}, {profile:1});
})

Meteor.publish('Tests', function () {
	return Tests.find({});
})

Meteor.publish('Dataset', function() {
	return Dataset.find({});
});
Meteor.publish("getUserData", function () {
	return Meteor.users.find({_id: this.userId});
});
console.log(Tests.find().count(), Fallbacks.find().count() )
if(Tests.find().count() === 0) {
    Tests.insert({numberOfChapters:3})
}
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
}]
for(var i = 0; i < data.length; i++) {
    Fallbacks.insert(data[i]);
}
} else {
	
}

// ,
// {
//     "category": "geslacht",
//     "words": [
//         {"male": "zijn", "female": "haar", "id": new Meteor.Collection.ObjectID()},
//         {"male": "hij", "female": "zij", "id": new Meteor.Collection.ObjectID()},
//         {"male": "man", "female": "vrouw", "id": new Meteor.Collection.ObjectID()},
//         {"male": "mannen", "female": "vrouwen", "id": new Meteor.Collection.ObjectID()},
//         {"male": "jongen", "female": "meisjes", "id": new Meteor.Collection.ObjectID()},
//         {"male": "jongens", "female": "meisjes", "id": new Meteor.Collection.ObjectID()},
//     ]
// }