import { Mongo } from 'meteor/mongo';

export var Stories = new Mongo.Collection('Stories');
export var userData = new Mongo.Collection('userData');
export var Fallbacks = new Mongo.Collection('Fallbacks');
export var Tests = new Mongo.Collection('Tests');