angular.module("subastababel").controller("AppController",
	["$scope","$location","paths","autentication",
	function($scope,$location,paths,autentication){
		//Controller properties
		var controller = this;
		controller.titles = {};
		controller.titles[paths.home] = "Subasta Babel";
		controller.titles[paths.listado] = "Subasta Activas";
		controller.titles[paths.login] = "Login";
		controller.titles[paths.registro] = "Registro";
		controller.titles[paths.nuevoAnuncio] = "Nueva Subasta";
		controller.titles[paths.subastasGanadas] = "Subastas ganadas";

		//Scope init
		$scope.model = {
			title: ""
		};
		$scope.user = "";

		//Scope EventListeners
		$scope.$on("$locationChangeSuccess", function(event,currentRoute){
			$scope.user = autentication.getLogin();
			$scope.model.title = controller.titles[$location.path()] || "404 Not Found";
			if(currentRoute.indexOf("registro")> -1){
				$location.url(paths.registro);
			}else{
				if(!autentication.isLogged()){
					$location.url(paths.login);	
				}else{
					$location.url(paths.currentRoute);
				}
			}			
		});
		$scope.$on("ChangeTitle", function(event,title){
			$scope.model.title = title;
		});


	}]
);