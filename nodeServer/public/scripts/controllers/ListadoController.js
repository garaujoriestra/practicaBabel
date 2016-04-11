angular.module("subastababel").controller("ListadoController",
	["$scope","$location","paths","autentication","APIClient","URL",'$timeout', 'datetime',
	function($scope,$location,paths,autentication,APIClient,URL,$timeout,datetime){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.user = autentication.getLogin();
		$scope.primera = true;


		//Scope methods
        $scope.getSaleDetailURL = function(sale){
        	$timeout.cancel(tick);
            return URL.resolve(paths.detalleAnuncio, { id : sale._id});
        }
		// Service Methods
		APIClient.getSales().then(
			function(data){
				console.log("entro aqui lo primero");
				processAuctionItems(data.rows);
				$scope.model = data.rows;
				$timeout(APIClient.getSales(), 10000);
				if(data.rows.length == 0){
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
	    	 console.log("entro aqui lo primero  2");

	        $scope.currentTime = moment();
	        processAuctionItems($scope.model);
	        $timeout(tick, 1000);
	    }
	    var processAuctionItems = function (data) {
	    	var i = 0;
	        angular.forEach(data, function (item) {
	        	item.tiempoRestante = datetime.getRemainigTime(item.timeToSale);
	        	if(item.tiempoRestante <= "0"){
	        		for(var i = 0; i < $scope.model.length ; i++){
	        			if($scope.model[i]._id == item._id){
	        				$scope.model.splice(i, 1);
	        			}
	        		}
		    		APIClient.deleteSale(item._id).then(
						function(sale){
							console.log("Subasta eliminada.");
							return;
						},
						function(error){
							console.log("Ha habido un error al eliminar la subasta");
							return;
						}
					);
		    	}
	        });
	   	}
	    $scope.currentTime = moment();
	    $timeout(tick, 1000);
	    $timeout(APIClient.getSales(), 10000);
    }]
);