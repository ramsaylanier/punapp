Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	action: function(){
		Session.set('category', null);
		this.render('landingPage');
	}
})

Router.route('/:username', {
	template: 'userPuns',
	data: function(){
		return Puns.find({username: this.params.username}, {sort: {'punCreatedAt._d': -1}, limit: 25})
	},
	waitOn: function(){
		return Meteor.subscribe('userPuns', this.params.username);
	}
})

Router.route('/category/:category', {
	action: function(){
		Session.set('category', this.params.category);
		this.render('landingPage');
	}
})