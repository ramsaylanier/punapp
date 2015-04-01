Template.header.events({
	'click .twitter-login-link': function(){
		var loginStyle = 'popup';

		Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else{
				var username = Meteor.user().username;

				// Meteor.call('getTwitterStream', username, function(error, result){
				// 	if (error){
				// 		Errors.throw(error.reason, 'error');
				// 		console.log(error);
				// 	} else {
				// 		console.log(result);
				// 	}
				// });

				Router.go('/' + username);
			}
		})
	},
	'click .logout-link': function(){
		Meteor.logout();
	}
})

Template.header.helpers({
	headerOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var headerOptions = {animateIn: "swingIn", animateOut: 'fadeOut'};
		var options = _.extend(defaultOptions, headerOptions);

		return options;
	},
	username: function(){
		return Meteor.user().username;
	}
})