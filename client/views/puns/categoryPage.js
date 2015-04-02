Template.categoryPage.onCreated(function(){

	var instance = this;
	var category = new ReactiveVar();
});


Template.categoryPage.helpers({
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: '#' + Router.current().params.category, duration: 500};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	},
	pageTitle: function(){
		return Session.get('currentPageTitle');
	}
})