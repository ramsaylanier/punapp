Template.landingPage.helpers({
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: "Home", duration: 500};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	}
})