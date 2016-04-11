angular.module("subastababel").directive("saleItem", function(){
	return{
		restrict: "AE",
		templateUrl: "views/saleItem.html",
		scope: {
			model: "=item",
			successMessage : "=",
			errorMessage : "=",
			timer:"=",
			newSalePrice : "=",
			updateSale : "&"
		}
	};
});