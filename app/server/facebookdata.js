import { Userdata } from '../imports/lib/collections.js';
//  brother, sister, mother father, 
// friendlists
// likes,
// first_name,gender,install_type,interested_in,languages,last_name,accounts,achievements




Accounts.onLogin(function(user){
	console.log(user.user.services.facebook.accessToken);
	
    var accessToken = user.user.services.facebook.accessToken;
    var fields = 'id,name,work,family,education,relationship_status,significant_other, religion,political,favorite_athletes,favorite_teams,books,email,about,music,birthday,events,games,hometown,location,posts,tagged_places,website,insights,inspirational_people,bio,age_range,devices,first_name,gender,install_type,interested_in,languages,last_name'

    if (!user || !accessToken)
      throw new Meteor.Error(500, "Not a valid Facebook user logged in");
    
    var result =  HTTP.get("https://graph.facebook.com/me?fields=" + fields + "", {params: {access_token: accessToken}});
    var data = result.data;
    data._id = Meteor.userId();
    
    if(Userdata.find({_id: Meteor.userId()}).fetch()[0]) {
    	
    	Userdata.update({_id:Meteor.userId()},data)
    }	
    else {
    	console.log('nog niet!')
    	Userdata.insert(data);
    }
    
})

