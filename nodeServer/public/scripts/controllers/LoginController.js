angular.module("subastababel").controller("LoginController",
	["$scope","$location","apiPaths","paths","autentication",
	function($scope,$location,apiPaths,paths,autentication){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.user = [];
            $scope.wrongPass = "diferente";
            $scope.wrongUser = "diferente";

		// Scope methods
		$scope.login = function(){
                  var user = {name : $scope.model.name, password: $scope.model.password, operacion : "login" };
                  autentication.login(user,function(res_login){
                        if(res_login == "pass"){
                              $scope.wrongPass = "";
                        }else if(res_login == "usuario"){
                              $scope.wrongUser = "";
                        }else{
                            localStorage.setItem("userLogged", res_login);
                            $location.url(paths.listado);  
                        }  
                  });   		
		};
		$scope.signin = function(){
                  $location.url(paths.registro);			
		};
	}]
);