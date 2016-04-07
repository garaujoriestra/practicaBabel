angular.module("subastababel").controller("SaleDetailController",
	["$scope","$routeParams","$location","APIClient","paths",
	function($scope,$routeParams,$location,APIClient,paths){
		//Scope Init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.minimo = 0;
		$scope.$emit("ChangeTitle","loading");

		//Scope Methods
		$scope.parseInt = function(num){
	    	return parseInt(num);
	    }

		//Service Methods.
		APIClient.getSale($routeParams.id).then(
			function(sale){
				$scope.model = sale.rows[0];
				$scope.minimo = parseInt(sale.rows[0].minimumPrice);
				$scope.$emit("ChangeTitle",$scope.model.name);
				$scope.uiState = "ideal";
			}, 
			function(error){
				$location.url(paths.notFound);
			}
		);
	}]
);