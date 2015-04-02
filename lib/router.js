Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	onBeforeAction: function(){
		Session.set('category', null);
		console.log('hi');
		this.next();
	},
	action: function(){
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
	onBeforeAction: function(){
		Session.set('category', this.params.category);
		this.next();
	},
	action: function(){
		this.render('categoryPage');
	}
})