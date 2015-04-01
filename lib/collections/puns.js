Puns = new Mongo.Collection('puns');

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
		console.log(username);

		var tweets;

		var consumerKey = Meteor.settings.twitter.public;
		var consumerSecret = Meteor.settings.twitter.private;
		var token =  Meteor.settings.twitter.accessToken;
		var tokenSecret =  Meteor.settings.twitter.accessTokenSecret;

		var Twit = Meteor.npmRequire('twit')
 
		var T = new Twit({
		    consumer_key: consumerKey
		  , consumer_secret: consumerSecret
		  , access_token: token
		  , access_token_secret: tokenSecret
		})

		T.get('statuses/user_timeline', { screen_name: username, count: 200, trim_user: true, include_rts: false, exclude_replies: true }, function(err, data, response) {
		  if (err){
		  	throw new Meteor.Error(422, err)
		  } else {
		  	tweets = data;

		  	var puns = filterTweets(tweets, '#pun');

		  	console.log(puns);
		  }
		});





		// var oauthSignature = Meteor.npmRequire('oauth-signature');

		// var nonce = CryptoJS.enc.Base64.parse(generateNonce(32));
		// var encodedNonce = CryptoJS.enc.Base64.stringify(nonce);
		// var oauthMethod = "HMAC-SHA1";
		// var timestamp = Math.floor(Date.now() / 1000);

		// var apiBase = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

		// var parameters = {
		// 	oauth_consumer_key: consumerKey,
		// 	oauth_token: token,
		// 	oauth_nonce: encodedNonce,
		// 	oauth_timestamp: timestamp,
		// 	oauth_signature_method: 'HMAC-SHA1',
		// 	oauth_version: '1.0',
		// 	screen_name: username
		// }

		// var encodedSignature = oauthSignature.generate('GET', apiBase, parameters, consumerSecret, tokenSecret );

		// var authorizationHeader = 	'Oauth oauth_consumer_key="' + encodeURIComponent(consumerKey) + '", ' +
		// 							'oauth_nonce="' + encodeURIComponent(encodedNonce) + '", ' + 
		// 							'oauth_signature="' + encodedSignature + '", ' +
		// 							'oauth_signature_method="HMAC-SHA1", ' +
		// 							'oauth_timestamp="' + encodeURIComponent(timestamp) + '", ' +
		// 							'oauth_token="' + encodeURIComponent(token) + '", ' +
		// 							'oauth_version="1.0"'

		// var result = HTTP.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + username,
		// 				{	
		// 					headers:{
		// 						"Authorization": authorizationHeader
		// 					}	
		// 				});
	},

	getTwitterStream: function(username){

		// var consumerKey = Meteor.settings.twitter.public;
		// var consumerSecret = Meteor.settings.twitter.private;

		// var OAuth = Meteor.npmRequire('oauth');


		// var oauth = new OAuth.OAuth(
		//   'https://api.twitter.com/oauth/request_token',
		//   'https://api.twitter.com/oauth/access_token',
		//   consumerKey,
		//   consumerSecret,
		//   '1.0A',
		//   null,
		//   'HMAC-SHA1'
		// );

		// console.log(oauth);

			// oauth.get(
			//   'https://api.twitter.com/1.1/trends/place.json?id=23424977',
			//   'your user token for this app', //test user token 
			//   'your user secret for this app', //test user secret             
			//   function (e, data, res){
			//     if (e) console.error(e);        
			//     console.log(require('util').inspect(data));
			//     done();      
			//   });    

		// var Stream = Meteor.npmRequire('user-stream');

		// var stream = new Stream({
		//     consumer_key: consumerKey,
		//     consumer_secret: consumerSecret,
		//     access_token_key: token,
		//     access_token_secret: tokenSecret
		// });

		// var params = {
		//     with: 'user',
		//     track: 'pun'
		// }
		// //create stream 
		// stream.stream(params);
		 
		// //listen stream data 
		// stream.on('data', function(json) {
		//   console.log(json);
		// });


	// 	var nonce = CryptoJS.enc.Base64.parse(generateNonce(32));
	// 	var encodedNonce = CryptoJS.enc.Base64.stringify(nonce);
	// 	var oauthMethod = "HMAC-SHA1";
	// 	var timestamp = Math.floor(Date.now() / 1000);

	// 	var apiBase = 'https://api.twitter.com/1.1/statuses/update.json';

	// 	var parameters = {
	// 		oauth_consumer_key: consumerKey,
	// 		oauth_token: token,
	// 		oauth_nonce: encodedNonce,
	// 		oauth_timestamp: timestamp,
	// 		oauth_signature_method: 'HMAC-SHA1',
	// 		oauth_version: '1.0',
	// 		status: status
	// 	}

	// 	var encodedSignature = oauthSignature.generate('POST', apiBase, parameters, consumerSecret, tokenSecret );

	// 	var authorizationHeader = 	'Oauth oauth_consumer_key="' + encodeURIComponent(consumerKey) + '", ' +
	// 								'oauth_nonce="' + encodeURIComponent(encodedNonce) + '", ' + 
	// 								'oauth_signature="' + encodedSignature + '", ' +
	// 								'oauth_signature_method="HMAC-SHA1", ' +
	// 								'oauth_timestamp="' + encodeURIComponent(timestamp) + '", ' +
	// 								'oauth_token="' + encodeURIComponent(token) + '", ' +
	// 								'oauth_version="1.0"'

	// 	var result = HTTP.post("https://api.twitter.com/1.1/statuses/update.json?status=" + encodedStatus,
	// 					{	
	// 						headers:{
	// 							"Authorization": authorizationHeader
	// 						}	
	// 					});
	// }
	}
})