Template.userPuns.events({
	'click .get-user-tweets-btn': function(){
		var username = Meteor.user().username;

		Meteor.call('getUserPuns', username, function(error, result){
			if (error){
				Errors.throw(error.reason, 'error')
			} else {
				console.log(result);
			}
		})
	}
})

Template.userPuns.helpers({
	username: function(){
		console.log(Router.current().params);
		return Router.current().params.username;
	}
})