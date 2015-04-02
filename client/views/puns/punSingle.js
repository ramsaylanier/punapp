Template.punSingle.helpers({
	publicList: function(){
		if (this.listType == 'public'){
			return true;
		}
	},
	punCreatedAt: function(){
		return moment(this.punCreatedAt._d).format("MMM Do, YYYY");
	}
})