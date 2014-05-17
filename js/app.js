(function () {

    var app = angular.module("c4iapp", ['ngRoute','ngSanitize']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', { templateUrl: "views/home.html", controller: "HomeController"} )
            .when('/deputato', { templateUrl: "views/deputato.html", controller: "DeputatoController"} )
            .when('/atto', { templateUrl: "views/atto.html", controller: "AttoController"} )


            .when('/sparql', { templateUrl: "views/sparql.html", controller: "HomeController"} )
            .otherwise({redirectTo: '/home'})
        ;
    }]);

})();

