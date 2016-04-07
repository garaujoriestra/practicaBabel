//Defino el módulo "subastababel"
angular.module("subastababel",['ngRoute',"URL","ngSanitize"]).config(
	["$routeProvider","paths", function($routeProvider,paths){
		//Configuro las URLS de la app
		$routeProvider
			.when(paths.home, {
				redirectTo: paths.listado
			}).when(paths.login, {
				templateUrl: 'views/login.html'
			}).when(paths.listado, {
				templateUrl: 'views/listado.html'
			}).when(paths.registro, {
				templateUrl: 'views/registro.html'
			}).when(paths.nuevoAnuncio, {
				templateUrl: 'views/formAnuncio.html'
			}).when(paths.detalleAnuncio, {
				templateUrl: 'views/saleItemDetail.html',
				controller: "SaleDetailController"
			}).otherwise({
				templateUrl: 'views/404.html'
			})

	}]
);
