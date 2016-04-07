angular.module("subastababel").controller("LoginController",
	["$scope","$location","apiPaths","paths","autentication",
	function($scope,$location,apiPaths,paths,autentication){
		
		// Scope init
		$scope.uiState = "loading";
		$scope.model = {};
		$scope.user = [];
		$scope.userExiste = "diferente";

		// Scope methods
		$scope.login = function(){
                  var user = {name : $scope.model.name, password: $scope.model.password };
                  autentication.login(user).then(
                  	function(user){
                  		if(user.rows.length == 0){
                  			$scope.userExiste = "";
                  		}else{
                  			localStorage.setItem("userLogged", user.rows[0].name);
                  			$location.url(paths.listado);
                  		}		
                  	},
                  	function(error){
                  		alert("Ese login no existe");
                  	}
                  );			
		};
		$scope.signin = function(){
                  $location.url(paths.registro);			
		};
	}]
);