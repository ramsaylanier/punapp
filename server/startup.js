Meteor.methods({
	serviceConfig: function(loginStyle){
		ServiceConfiguration.configurations.upsert(
		{ service: "twitter" },
		{
			$set: {
			  consumerKey: Meteor.settings.twitter.public,
			  loginStyle: loginStyle,
			  secret: Meteor.settings.twitter.private
			}
		});
	}
})

Meteor.startup(function(){
	ServiceConfiguration.configurations.remove();

	if (Puns.find().count() < 300){
		var counter = 0;

		while(counter < 300){
			console.log(counter);

			var date = randomDate(new Date(2012, 0, 1), new Date());

			Factory.create('pun', {
				username: Fake.user({fields: ['username']}).username,
				punText: Fake.paragraph(1),
				punCreatedAt: moment(date),
				categories: [Fake.fromArray(['dadjoke', 'pants', 'cats', 'dogs', 'fartjokes'])]
			});

			counter++;
		}
	}
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}