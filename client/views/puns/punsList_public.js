Template.punsList_public.helpers({
	puns: function(){
		return Puns.find({}, {limit: 25});
	},
	context: function(){
		var context = this;

		context.listType = 'public';

		return context;
	}
});
