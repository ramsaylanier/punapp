Meteor.publish('userPuns', function(username){
	return Puns.find({username: username});
})