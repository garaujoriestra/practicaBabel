angular.module("subastababel").service("times",
 ['$timeout',
 function($timeout){
    //Service Methods.
    var miTimer;
    this.myTimeOut = function (fn, tiempo) {
        miTimer = $timeout(fn, tiempo);
        return miTimer;
    }
    this.deleteTimeOut = function(){
        $timeout.cancel(miTimer);
    }
}]);