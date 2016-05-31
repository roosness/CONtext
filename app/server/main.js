import { Meteor } from 'meteor/meteor';

import '../imports/lib/collections.js'

import '../imports/lib/methods.js'

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1710895075837437',
    secret: 'f3a7c7f8efc060601d5de386ecbdb904'
});
