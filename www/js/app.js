(function () {

    var app = angular.module("c4iapp", ['ngRoute','ngSanitize']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: "views/home.html", controller: "HomeController"} )
            .when('/sparql', { templateUrl: "views/sparql.html", controller: "HomeController"} )
            .otherwise({redirectTo: '/home'})
        ;
    }]);

    app.config(function($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

    app.controller("HomeController", ["$scope", "SPARQL", "$log", function ($scope, SPARQL, $log) {
        $scope.title = "Home Controller Title";

        var qres = SPARQL.then(function (data) {
            $log.log("Data: ", data);
        });
    }]);

})();

