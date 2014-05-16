(function () {

    var app = angular.module("c4iapp", ['ngRoute','ngSanitize']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: "views/home.html", controller: "HomeController"} )
            .when('/sparql', { templateUrl: "views/sparql.html", controller: "HomeController"} )
            .otherwise({redirectTo: '/home'})
        ;
    }]);

    app.controller("HomeController", ["$scope", function ($scope) {
        $scope.title = "Home Controller Title";
    }]);

})();

