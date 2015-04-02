Template.search.events({
	'submit form': function (event) {
		event.preventDefault();
		window.location.href="category/"+event.target[0].value;
	}
});
Template.search.helpers({
	context: function () {
		var context = this;
		context.listType='public';
		return context;
	}
});