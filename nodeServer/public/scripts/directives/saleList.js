angular.module("subastababel").directive("saleList", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			getDetailUrl : "&"
		},
		templateUrl:"views/saleList.html"
	};
});