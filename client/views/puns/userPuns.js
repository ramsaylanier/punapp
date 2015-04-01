Template.userPuns.helpers({
	username: function(){
		console.log(Router.current().params);
		return Router.current().params.username;
	}
})