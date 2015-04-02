Puns = new Mongo.Collection('puns');

var punCats = ['dadjoke', 'pants', 'cats', 'dogs', 'fartjokes'];

Factory.define('pun', Puns, {
	username: 'username',
	punText: Fake.paragraph(1),
});

generateNonce = function(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < length; ++i) {
        var rnum = Math.floor(Math.random() * chars.length);
        result += chars.substring(rnum, rnum+1);
    }
    return result;
}

function filterTweets(data, filter){
	var res = [];

	for(var i = 0; i<data.length; i++){
		if(data[i].text.indexOf(filter) != -1){
			res.push(data[i]);
		}
	}

	return res;
}

Meteor.methods({
	getUserPuns: function(username){
		var tweets;

		var consumerKey = Meteor.settings.twitter.public;
		var consumerSecret = Meteor.settings.twitter.private;
		var token =  Meteor.settings.twitter.accessToken;
		var tokenSecret =  Meteor.settings.twitter.accessTokenSecret;

		var Twit = Meteor.npmRequire('twit');
 
		var T = new Twit({
		    consumer_key: consumerKey
		  , consumer_secret: consumerSecret
		  , access_token: token
		  , access_token_secret: tokenSecret
		})

		T.get('statuses/user_timeline', { screen_name: username, count: 200, trim_user: true, include_rts: false, exclude_replies: true }, Meteor.bindEnvironment(
			function(err, data, response) {
				if (err){
					throw new Meteor.Error(422, err)
				} else {
				  	tweets = data;

				  	var puns = filterTweets(tweets, '#pun');

				  	_.each(puns, function(pun){

				  		var punToInsert = {
				  			username: username,
				  			tweetId: pun.id,
				  			punText: pun.text,
				  			punCreatedAt: moment(pun.created_at),
				  			categories: _.pluck(pun.entities.hashtags, 'text')
				  		};

				  		Puns.upsert({tweetId: pun.id}, {$set: punToInsert});
				  	});
				}
			})
		);
	}
})