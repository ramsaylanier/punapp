Template.categoryPage.onCreated(function(){
	var instance = this;
	instance.category = new ReactiveVar();

	instance.autorun(function(){
		instance.category.set(Router.current().params.category);
	})
});

Template.categoryPage.onRendered(function(){
	console.log('category page rendered');
})

Template.categoryPage.helpers({
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: '#' + Template.instance().category.get(), duration: 500};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	},
	pageTitle: function(){
		return Template.instance().category.get();
	}
});

Template.categoryPage.events({
	'click .category-link': function(e){
		e.preventDefault();
		var page = $('.page');
		var options = Session.get('pageOptions');
		var url = $(e.currentTarget).attr('href');

		if (url == window.location.pathname){
			return false;
		} else {
			animationType = options.animateIn;
			donutAnimation.findAnimation(options, animationType, page, url);
		}


	}
})