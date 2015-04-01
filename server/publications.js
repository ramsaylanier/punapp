Meteor.publish('userPuns', function(username){
	return Puns.find({username: username});
})

Meteor.publish('publicPuns', function(limit){
	return Puns.find({}, {sort: {punCreatedAt: -1}, limit: 25})
})