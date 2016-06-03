import { Mongo } from 'meteor/mongo';

export const Chapters = new Mongo.Collection('Chapters');
export const Dataset = new Mongo.Collection('Dataset');


if(Meteor.isServer) {
	Meteor.publish('Chapters', function() {
		return Chapters.find({});
	});

	Meteor.publish('Dataset', function() {
		return Dataset.find({});
	});
	Meteor.publish("getUserData", function () {
    return Meteor.users.find({_id: this.userId});
});

	
}

