Template.header.events({
	'click .twitter-login-link': function(){
		var loginStyle = 'popup';

		Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else
				Router.go('/');
		})
	},
})

Template.header.helpers({
	username: function(){
		return Meteor.user().username;
	}
})