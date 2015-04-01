Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	template: 'landingPage'
})

Router.route('/:username', {
	template: 'userPuns',
	data: function(){
		return Puns.find({username: this.params.username})
	},
	waitOn: function(){
		return Meteor.subscribe('userPuns', this.params.username);
	}
})