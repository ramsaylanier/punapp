Template.userPuns.events({
	'click .get-user-tweets-btn': function(e){
		var username = Router.current().params.username;
		var icon = $('.refresh-icon');
		var arrow = $('.arrow');

		$(e.currentTarget).addClass('loading');

		arrow.velocity("stop");

		arrow.velocity({
			"rotateZ": "360deg",
		}, {duration: 1000, easing: 'linear', loop: true});

		icon.velocity({
			scale: 1.8,
		}, 1000, [1000, 30]);

		Meteor.setTimeout(function(){
			Meteor.call('getUserPuns', username, function(error, result){
				if (error){
					Errors.throw(error.reason, 'error')
				} else {
					$(e.currentTarget).removeClass('loading');

					arrow.velocity("stop");

					icon.velocity({
						scale: 1
					}, 1000, [1000, 30]);

					arrow.velocity({
						scale: 1,
						rotateZ: '0deg'
					}, {duration: 1000, easing: [1000, 30], loop: false, queue: false});
				}
			});
		}, 500);
	},
	'mouseenter .refresh-btn': function(e){
		if (!$(e.target).hasClass('loading')){
			var icon = $('.refresh-icon');
			var arrow = $('.arrow');

			icon.velocity('stop');
			arrow.velocity('stop');

			arrow.velocity({
				scale: .8
			}, 1000, [1000, 30]);

			icon.velocity({
				scale: 1.8
			}, 1000, [1000, 30]);
		} else {
			return false;
		}
	},
	'mouseleave .refresh-btn': function(e){
		if (!$(e.target).hasClass('loading')){
			var icon = $('.refresh-icon');
			var arrow = $('.arrow');

			icon.velocity('stop');
			arrow.velocity('stop');

			arrow.velocity({
				scale: 1
			}, 1000, [1000, 30]);

			icon.velocity({
				scale: 1
			}, 1000, [1000, 30]);
		} else {
			return false;
		}
	}
})

Template.userPuns.helpers({
	pageOptions: function(){
		var defaultOptions = getDefaultPageOptions();
		var pageOptions = {animateIn: "fadeIn", animateOut: 'fadeOut', pageTitle: "Home", duration: 500};
		var options = _.extend(defaultOptions, pageOptions);

		return options;
	},
	username: function(){
		return Router.current().params.username;
	},
	puns: function(){
		return Puns.find({username: Router.current().params.username})
	}
})