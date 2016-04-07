angular.module("subastababel").controller("NuevoAnuncioController",
	["$scope","$location","APIClient","paths","autentication",
	function($scope,$location, APIClient,paths,autentication){
		//Scope init
		$scope.model = {};
		$scope.successMessage = null;
		$scope.errorMessage = null;

		//Scope methods
		$scope.saveSale = function(){
			$scope.model.owner = autentication.getLogin();
			$scope.model.bid = null;
			$scope.model.bestBidder = "";
			APIClient.createSale($scope.model).then(
				function(sale){
					$scope.successMessage = "Sale saved!"
					$scope.model = {};
					$location.url(paths.listado);	
				},
				function(error){
					$scope.errorMessage = "Fatal error. The end is near.";			
				}
			);
		}
	}]
);
