angular.module("subastababel").controller("SaleDetailController",
	["$scope","$routeParams","$location","APIClient","paths",'$timeout', 'datetime',"autentication","times",
	function($scope,$routeParams,$location,APIClient,paths,$timeout,datetime,autentication,times){
		//Scope Init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.minimo = 0;
		$scope.$emit("ChangeTitle","loading");
		$scope.successMessage = null;
		$scope.errorMessage = null;

	    $scope.$on("$locationChangeSuccess", function(event,currentRoute){
            times.deleteTimeOut();
        });
        $scope.updateSale = function(bid){
        	$scope.model.bid = bid;
        	$scope.model.bestBidder = autentication.getLogin();
            APIClient.putSale($routeParams.id,$scope.model).then(
				function(sale){
					$scope.model.bid = sale.rows[0].bid;
					$scope.model.bestBidder = sale.rows[0].bestBidder;
					$scope.successMessage = "Subasta actualizada con éxito";
					$scope.newSalePrice.$setPristine();
				},
				function(error){
					$location.url(paths.notFound);	
					$scope.errorMessage = "Ha habido un error con su puja";	
				}
			);
        }
		//Service Methods.
		APIClient.getSale($routeParams.id).then(
			function(sale){
				processItem(sale);
				$scope.model = sale.rows[0];
				//$timeout(APIClient.getSale($routeParams.id), 10000);
				$scope.model.minimo = parseInt(sale.rows[0].minimumPrice);
				$scope.$emit("ChangeTitle",$scope.model.name);
				$scope.uiState = "ideal";
			}, 
			function(error){
				$location.url(paths.notFound);
			}
		);
		//Funcion recursiva con $timeout para ir actualizando el contador cada segundo.
		var tick = function () {
	        $scope.currentTime = moment();
	        processAuctionItems($scope.model.timeToSale);
	        times.myTimeOut(tick,1000);
	    }
	    var processItem = function (data) {
	    	$scope.timer = datetime.getRemainigTime(data.rows[0].timeToSale);
	    }
        //Comprobando que se acaba alguna subasta para eliminarla y guardarla en la lista de las ganadoras.
	    var processAuctionItems = function (data) {
	    	$scope.timer = datetime.getRemainigTime(data);
	    	if($scope.timer <= "0"){
	    		APIClient.deleteSale($routeParams.id).then(
					function(sale){
						$location.url(paths.listado);
					},
					function(error){
						console.log("Ha habido un error al eliminar la subasta en detalle");
					}
				);
	    	}
	    }
	    times.myTimeOut(tick,1000);
	    //$timeout(APIClient.getSale($routeParams.id), 10000);
	}]
);