import { userData } from '../lib/collections.js';
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1713199082273703',
    secret: '53f58b34d62a2e6c4b536f6de1c8b44b',
});
Accounts.onLogin(function(user){
    var accessToken = user.user.services.facebook.accessToken;
    var fields = 'id,name,work,family,education,relationship_status,significant_other,religion,political,favorite_athletes,favorite_teams,email,music,birthday,events,games,hometown,location,posts,tagged_places,website,inspirational_people,bio,age_range,devices,first_name,gender,install_type,interested_in,languages,last_name';
    console.log('accessToken' + accessToken)
    if (!user || !accessToken) {
      throw new Meteor.Error(500, "Not a valid Facebook user logged in");
    }
    var result =  HTTP.get("https://graph.facebook.com/me?fields=" + fields + "", {params: {access_token: accessToken}});
    let userId = Meteor.userId();
    var name = result.data.name
    if(name.indexOf('Roos') >= 0 ) {
        console.log('innit!')
        Roles.addUsersToRoles( Meteor.userId(), [ 'admin' ] );
    }
     var data = result.data;
    data._id = Meteor.userId();
    if(userData.find({_id: Meteor.userId()}).fetch()[0]) {
        userData.update({_id:Meteor.userId()},data)
    }   
    else {
        userData.insert(data);
    }
})