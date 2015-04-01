Meteor.methods({
	serviceConfig: function(loginStyle){
		ServiceConfiguration.configurations.upsert(
		{ service: "twitter" },
		{
			$set: {
			  consumerKey: Meteor.settings.twitter.public,
			  loginStyle: loginStyle,
			  secret: Meteor.settings.twitter.private
			}
		});
	}
})

Meteor.startup(function(){
	ServiceConfiguration.configurations.remove();
})