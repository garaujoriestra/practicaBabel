angular.module("subastababel").directive("saleList", function(){
	return {
		restrict:"AE",
		scope: {
			model:"=items",
			timer:"@",
			getDetailUrl : "&"
		},
		templateUrl:"views/saleList.html"
	};
});