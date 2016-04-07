angular.module("subastababel").service("APIClient", 
    ["$http", "$q", "apiPaths","URL",
    function($http, $q, apiPaths,URL){
        //Service Methods

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
        //Get de Anuncios.
        this.getSales = function(){
            return this.apiRequest(apiPaths.sales);    
        };
        //Get de anuncio pasandole ID como parámetro.
        this.getSale = function(saleId){
            var url = URL.resolve(apiPaths.saleDetail, {id: saleId});
            return this.apiRequest(url);
        };

        //Post de Anuncio Devolviendo promise.
        this.createSale = function(sale){
            var deferred = $q.defer();
            $http.post(apiPaths.sales,sale).then(
                function(response){
                        deferred.resolve(response.data);
                },
                function(response){
                        deferred.reject(response.data);
                }
            );
            return deferred.promise; 
        }
    }]
);