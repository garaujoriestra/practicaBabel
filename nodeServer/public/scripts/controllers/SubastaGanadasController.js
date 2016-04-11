angular.module("subastababel").controller("SubastasGanadasController",
	["$scope","$location","paths","autentication","APIClient","URL",
	function($scope,$location,paths,autentication,APIClient,URL){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.user = autentication.getLogin();

		// Service Methods
		APIClient.getSalesWinName($scope.user).then(
			function(data){
				console.log("Lo que me ha devuelto la bbdd es : ", data);
				$scope.model = data.rows;
				if(data.rows.length == 0){
					$scope.uiState = "blank";
				}else{
					$scope.uiState = "ideal";
				}
			},
			function(data){
				console.log("La bbdd me ha devuelto ete error :  ", data);
			}
		);
    }]
);