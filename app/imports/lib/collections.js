import { Mongo } from 'meteor/mongo';

export var Chapters = new Mongo.Collection('Chapters');
export var Dataset = new Mongo.Collection('Dataset');
export var Tests = new Mongo.Collection('Tests');
export var Filters = new Mongo.Collection('Filters');
export var Userdata = new Mongo.Collection('Userdata');
export var Fallbacks = new Mongo.Collection('Fallbacks');


