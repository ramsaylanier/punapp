Meteor.publish('userPuns', function(username){
	return Puns.find({username: username});
})

Meteor.publish('publicPuns', function(limit, category){

	var query = {};

	if (category){
		query = {categories: category}
	}

	return Puns.find(query, {sort: {punCreatedAt: -1}, limit: 25})
})