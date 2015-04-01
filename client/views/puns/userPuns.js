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
		return Router.current().params.username;
	},
	puns: function(){
		return Puns.find({username: Router.current().params.username})
	}
})