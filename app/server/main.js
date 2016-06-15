import { Meteor } from 'meteor/meteor';

import { Chapters, Tests, Filters } from '../imports/lib/collections.js'

import '../imports/lib/methods.js'

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1713199082273703',
    secret: '53f58b34d62a2e6c4b536f6de1c8b44b',

});


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

