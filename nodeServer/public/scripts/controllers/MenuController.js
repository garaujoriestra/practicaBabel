//En el módulo moviedb, defino el controlador.
angular.module("subastababel").controller("MenuController",
	["$scope","$location","paths", "autentication",
	function($scope,$location,paths,autentication){
		//Scope init
		$scope.model = {
			selectedItem: ""
		};
		$scope.paths = paths;


		//Scope methods
		$scope.getClassForItem = function(item){
			if($scope.model.selectedItem == item){
				return "active";
			}else{
				return "";
			}
		}
		$scope.logout = function(){
			autentication.logout();
			$location.url(paths.login);			
		};
		
		//Scope event listeners
		$scope.$on("$locationChangeSuccess", function(event,currentRoute){
			$scope.model.selectedItem = $location.path();
		});
	}]
);