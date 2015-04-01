Template.punsList_public.helpers({
	puns: function(){
		return Puns.find({}, {limit: 25});
	}
});
