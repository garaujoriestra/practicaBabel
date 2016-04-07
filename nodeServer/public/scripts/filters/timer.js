angular.module("subastababel").filter('timer',
	['datetime', function (datetime) {
    return function (input, css) {
        var duration = datetime.duration(input);
        return duration.hours + "h:" + duration.minutes + "m:" + duration.seconds + "s";
    };
}]);