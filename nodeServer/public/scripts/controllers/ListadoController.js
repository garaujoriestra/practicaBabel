angular.module("subastababel").controller("ListadoController",
	["$scope","$location","paths","autentication","APIClient","URL",
	function($scope,$location,paths,autentication,APIClient,URL){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.user = autentication.getLogin();

		//Scope methods
        $scope.getSaleDetailURL = function(sale){
            return URL.resolve(paths.detalleAnuncio, { id : sale._id});
        }
		// Service Methods
		APIClient.getSales().then(
			function(data){
				$scope.model = data.rows;
				if(data.length == 0){
					$scope.uiState = "blank";
				}else{
					$scope.uiState = "ideal";
				}
			},
			function(data){
				$log.error("Error", data);
				$scope.uiState = "error";
			}
		);
    }]
);