Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	template: 'landingPage',
	data: function(){
		return Puns.find({}, {sort: {punCreatedAt: -1}, limit: 25});
	},
	waitOn: function(){
		return Meteor.subscribe('publicPuns', 25);
	}
})

Router.route('/search', {
	template: 'search', 
	data: function(){
		return Puns.find({}, {sort: {punCreatedAt: -1}, limit: 25});
	},
	waitOn: function(){
		return Meteor.subscribe('publicPuns', 25);
	}
})

Router.route('/:username', {
	template: 'userPuns',
	data: function(){
		return Puns.find({username: this.params.username}, {sort: {punCreatedAt: -1}, limit: 25})
	},
	waitOn: function(){
		return Meteor.subscribe('userPuns', this.params.username);
	}
})

Router.route('/category/:category', {
	template: 'landingPage',
	data: function(){
		return Puns.find({categories: this.params.category}, {sort: {punCreatedAt: -1}, limit: 25} )
	},
	waitOn: function(){
		return Meteor.subscribe('publicPuns', 25, this.params.category);
	}

})