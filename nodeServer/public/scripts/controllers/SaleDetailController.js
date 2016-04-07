angular.module("subastababel").controller("SaleDetailController",
	["$scope","$routeParams","$location","APIClient","paths","moment",'$timeout', 'datetime',
	function($scope,$routeParams,$location,APIClient,paths,moment,$timeout,datetime){
		//Scope Init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.minimo = 0;
		$scope.$emit("ChangeTitle","loading");


		//Scope Methods
		$scope.parseInt = function(num){
	    	return parseInt(num);
	    }
        $scope.updateSale = function(){
        	console.log("Llego justo antes de mandarlo",$scope.model);
            /*APIClient.putSale($scope.model).then(
				function(sale){
					$scope.successMessage = "sale saved!"	
				},
				function(error){
					$scope.errorMessage = "Fatal error. The end is near.";			
				}
			);*/
        }


		//Service Methods.
		APIClient.getSale($routeParams.id).then(
			function(sale){
				processItem(sale);
				$scope.model = sale.rows[0];
				$timeout(APIClient.getSale($routeParams.id), 10000);
				$scope.model.minimo = parseInt(sale.rows[0].minimumPrice);
				$scope.$emit("ChangeTitle",$scope.model.name);
				$scope.uiState = "ideal";
			}, 
			function(error){
				$location.url(paths.notFound);
			}
		);
		var tick = function () {
	        $scope.currentTime = moment();
	        processAuctionItems($scope.model.timeToSale);
	        $timeout(tick, 1000);
	    }
	    var processItem = function (data) {
	    	$scope.timer = datetime.getRemainigTime(data.rows[0].timeToSale);
	    }
	    var processAuctionItems = function (data) {
	    	$scope.timer = datetime.getRemainigTime(data);
	    }
	    $scope.currentTime = moment();
	    $timeout(tick, 1000);
	    $timeout(APIClient.getSale($routeParams.id), 10000);
	}]
);