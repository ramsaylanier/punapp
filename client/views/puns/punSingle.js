Template.punSingle.helpers({
	itemOptions: function(){
		var options = {
			classes: 'pun',
			animateIn: 'slideInFromBottom_Short',
			animateOut: 'fadeOut',
			duration: 700
		};

		return options;
	},
	publicList: function(){
		if (this.listType == 'public'){
			return true;
		}
	},
	punCreatedAt: function(){
		return moment(this.punCreatedAt._d).format("MMM Do, YYYY");
	},
	favLink: function(){
		return "https://twitter.com/intent/favorite?tweet_id="+this.tweetId
	},
	rtLink: function(){
		return "https://twitter.com/intent/retweet?tweet_id="+this.tweetId
	}
})

Template.punSingle.events({
	'click .category-link': function(){
		
	}
})