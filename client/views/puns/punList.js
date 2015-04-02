Template.punList.created = function(){

  var instance = this;

  instance.category = new ReactiveVar(Session.get('category'));
  instance.loaded = new ReactiveVar(0);
  instance.query = new ReactiveVar({});

  Session.set('limit', 20);

  instance.autorun(function () {
    var limit = Session.get('limit');
    var category = Session.get('category');

    instance.category.set(category);

    if (instance.category.get() !== null){
		instance.query.set({categories: instance.category.get()});
	}

    instance.subscribe('publicPuns', limit, category);

    if (instance.subscriptionsReady()) {
	    instance.loaded.set(limit);
    }
  });

  instance.puns = function() { 
	return Puns.find(instance.query.get(), {sort: {'punCreatedAt._d': -1}, limit: instance.loaded.get()});
  }
}

Template.punList.rendered = function(){
	//infinite scrolling
	$(window).on('scroll', function(){
		var threshold, target = $(".show-more-awards");
		if (!target.length) return;

		threshold = $(window).scrollTop() + $(window).height() - target.height();

		if (target.offset().top < threshold) {
		    if (!target.data("visible")) {
		        target.data("visible", true);

		        Session.set('itemCount', 0);
			    var limit = Session.get('limit')
			    limit += 20;
			    Session.set('limit', limit);
		    }
		} else {
		    if (target.data("visible")) {
		        target.data("visible", false);
		    }
		}     
	})
}

Template.punList.helpers({
	puns: function(){
		return Template.instance().puns();
	},
	context: function(){
		var context = this;
		context.listType = 'public';
		return context;
	}
})