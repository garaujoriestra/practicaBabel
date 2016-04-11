angular.module("subastababel").filter("ago",
	[function(){
		return function(text){
			return moment(text).fromNow();
		};
	}]
); 