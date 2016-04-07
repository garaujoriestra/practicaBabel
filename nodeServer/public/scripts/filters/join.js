angular.module("subastababel").filter("join",
	["$log",function($log){
		return function(arr,sep){
			var items = arr || null;
			var separator = sep || ", ";
			if(items == null)
				return "";

			if(typeof arr.join == "undefined"){
				$log.error("The value passed to the filter 'join' must be an array.");
				return "";
			}
			return arr.join(separator);s
		};
	}]
); 