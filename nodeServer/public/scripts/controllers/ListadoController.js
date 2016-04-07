angular.module("subastababel").controller("ListadoController",
	["$scope","$location","paths","autentication","APIClient","URL","moment",'$timeout', 'datetime',
	function($scope,$location,paths,autentication,APIClient,URL,moment,$timeout,datetime){
		
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
				processAuctionItems(data.rows);
				$scope.model = data.rows;
				$timeout(APIClient.getSales(), 10000);
				if(data.length == 0){
					$scope.uiState = "blank";
				}else{
					$scope.uiState = "ideal";
				}
			},
			function(data){
				$log.error("Error", data);
				$timeout(APIClient.getSales(), 10000);
				$scope.uiState = "error";
			}
		);
	    var tick = function () {
	        $scope.currentTime = moment();
	        processAuctionItems($scope.model);
	        $timeout(tick, 1000);
	    }
	    var processAuctionItems = function (data) {
	    	var i = 0;
	        angular.forEach(data, function (item) {
	        	item.tiempoRestante = datetime.getRemainigTime(item.timeToSale);
	        });
	   	}
	    $scope.currentTime = moment();
	    $timeout(tick, 1000);
	    $timeout(APIClient.getSales(), 10000);
    }]
);