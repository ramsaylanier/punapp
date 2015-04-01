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

Meteor.methods({
	getTwitterStream: function(username){
		var Stream = Meteor.npmRequire('user-stream');

		var consumerKey = Meteor.settings.twitter.public;
		var consumerSecret = Meteor.settings.twitter.private;
		var token =  Meteor.settings.twitter.accessToken;
		var tokenSecret =  Meteor.settings.twitter.accessTokenSecret;

		var stream = new Stream({
		    consumer_key: consumerKey,
		    consumer_secret: consumerSecret,
		    access_token_key: token,
		    access_token_secret: tokenSecret
		});

		var params = {
		    with: 'user',
		    track: 'pun'
		}
		//create stream 
		stream.stream(params);
		 
		//listen stream data 
		stream.on('data', function(json) {
		  console.log(json);
		});


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