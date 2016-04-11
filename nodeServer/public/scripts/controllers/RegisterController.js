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
            var user = {name : $scope.model.name, password: $scope.model.password, operacion : "registro" };
            autentication.register(user,function(res_register){
	            if( res_register == ""){
	            	alert("Ha habido un problema a la hora de loguearte");
	            }else if (res_register == "existia"){
	            	$scope.wrongRegister = "";
	            }else{
	            	localStorage.setItem("userLogged", res_register);
	            	$location.url(paths.listado);
	            }	
            });			
		};
		$scope.enter = function(){
                  $location.url(paths.login);			
		};
	}]
);