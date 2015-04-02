Meteor.publish('userPuns', function(username){
	return Puns.find({username: username});
})

Meteor.publish('publicPuns', function(limit, category){

	var query = {};

	if (category !== null){
		query = {categories: category}
	}

	return Puns.find(query, {sort: {'punCreatedAt._d': -1}, limit: limit})
})