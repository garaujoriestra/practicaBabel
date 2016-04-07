angular.module("subastababel").controller("RegisterController",
	["$scope","$location","apiPaths","paths","autentication",
	function($scope,$location,apiPaths,paths,autentication){
		
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.user = [];
		$scope.wrongRegister = "diferente";

		//Scope methods.
		$scope.register = function(){
            var user = {name : $scope.model.name, password: $scope.model.password };
            autentication.register(user,function(res_login){
	            if( res_login == ""){
	            	alert("Ha habido un problema a la hora de loguearte");
	            }else if (res_login == "existia"){
	            	$scope.wrongRegister = "";
	            }else{
	            	$location.url(paths.listado);
	            }	
            });			
		};
	}]
);