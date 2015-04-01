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
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: "Home", duration: 500};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	},
	username: function(){
		return Router.current().params.username;
	},
	puns: function(){
		return Puns.find({username: Router.current().params.username})
	}
})