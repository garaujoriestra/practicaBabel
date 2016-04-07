angular.module("subastababel").service("autentication",
 ["$q","$log","$http","apiPaths","URL",
 function($q,$log,$http,apiPaths,URL){
 	
    //Service Methods.
    //Get devolviendo promesa.
    this.apiRequest = function(url){
        var deferred = $q.defer();
        $http.get(url).then(
            function(response){
                deferred.resolve(response.data);
            },
            function(response){
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    }
    //Comprueba si hay alguien logueado.
	this.isLogged = function(){
		var userLogged = localStorage.getItem("userLogged");
		if(userLogged !== ""){
			userLogin = true;
		}else{
			userLogin = false;
		}
		return userLogin;
	}
    //Devuelve quien esta logueado.
	this.getLogin = function(){
		return localStorage.getItem("userLogged");
	}
    //Get para loguearse.
    //Falta por acabar para poder comprobar tambien la contraseña.
	this.login = function(user){
		var url = URL.resolve(apiPaths.userName, {name: user.name});
        return this.apiRequest(url);
	}
    //Post de usuario
    //Falta acabarlo, para hacer aqui la hash de la pass.
	this.register = function(user,cb){
		$http.post(apiPaths.users,user)
        .success(function(data) {
        	if(!data.result){
        		cb("existia");
        	}else{
        		localStorage.setItem("userLogged", user.name);
            	cb(user.name);
        	}
        })
        .error(function(data) {
        	cb("");
        });
	}
    //Desloguea y quita el localstorage.
	this.logout = function(){
		localStorage.setItem("userLogged", "");
	}
}]);