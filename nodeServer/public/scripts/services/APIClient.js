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
        //Get de Anuncios.
        this.getSalesWinName = function(saleWinName){
            var url = URL.resolve(apiPaths.saleWinDetail, {name: saleWinName});
            return this.apiRequest(url);   

        };
        //Get de anuncio pasandole ID como parámetro.
        this.getSale = function(saleId){
            var url = URL.resolve(apiPaths.saleDetail, {id: saleId});
            return this.apiRequest(url);
        };

        //Delete de anuncio pasandole ID como parámetro.
        this.deleteSale = function(saleId){
            var url = URL.resolve(apiPaths.saleDetail, {id: saleId});
            var deferred = $q.defer();
            $http.delete(url).then(
                function(response){
                        deferred.resolve(response.data);
                },
                function(response){
                        deferred.reject(response.data);
                }
            );
            return deferred.promise;
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
        //Post de Anuncio Ganado Devolviendo promise.
        this.saveSaleWin = function(sale){
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
        //Put de anuncio para cambiar datos.
        this.putSale = function(saleID,sale){
            var url = URL.resolve(apiPaths.saleDetail, {id: saleID});
            var deferred = $q.defer();
            $http.put(url,sale).then(
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