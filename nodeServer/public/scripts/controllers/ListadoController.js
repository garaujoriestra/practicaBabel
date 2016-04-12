angular.module("subastababel").controller("ListadoController",
	["$scope","$location","paths","autentication","APIClient","URL",'$timeout', 'datetime',"times",
	function($scope,$location,paths,autentication,APIClient,URL,$timeout,datetime,times){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = [];
		$scope.user = autentication.getLogin();
		$scope.primera = true;


		//Scope methods
        $scope.getSaleDetailURL = function(sale){
            return URL.resolve(paths.detalleAnuncio, { id : sale._id});
        }
        //Para cancelar el $timeout cuando cambio de vista.
        $scope.$on("$locationChangeSuccess", function(event,currentRoute){
            times.deleteTimeOut();
        });
		// Service Methods
		APIClient.getSales().then(
			function(data){
				processAuctionItems(data.rows);
				$scope.model = data.rows;
				//$timeout(APIClient.getSales(), 10000);
				if(data.rows.length == 0){
					$scope.uiState = "blank";
				}else{
					$scope.uiState = "ideal";
				}
			},
			function(data){
				$log.error("Error", data);
				//$timeout(APIClient.getSales(), 10000);
				$scope.uiState = "error";
			}
		);
		//Funcion recursiva con $timeout para ir actualizando el contador cada segundo.
	    var tick = function () {
            $scope.currentTime = moment();
            processAuctionItems($scope.model);
            times.myTimeOut(tick,1000);
        }
        //Comprobando que se acaba alguna subasta para eliminarla y guardarla en la lista de las ganadoras.
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
	    //$timeout(APIClient.getSales(), 10000);
	    tick();
    }]
);