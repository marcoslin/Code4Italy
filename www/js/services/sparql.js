(function () {

    var app = angular.module("c4iapp");

    app.factory("SPARQL", ["$http", function ($http) {

        var sql = "select+%3Fluogo+%3Ftitle%0D%0Awhere+%7B%0D%0A++++%3Fluogo+a+ocd%3Aluogo+.%0D%0A++++%3Fluogo+dc%3Atitle+%3Ftitle%0D%0A%7D%0D%0ALIMIT+";
        var jsonUrl = "http://dati.camera.it/sparql?default-graph-uri=&query=select+%3Fluogo+%3Ftitle%0D%0Awhere+%7B%0D%0A++++%3Fluogo+a+ocd%3Aluogo+.%0D%0A++++%3Fluogo+dc%3Atitle+%3Ftitle%0D%0A%7D%0D%0ALIMIT+10&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";

        delete $http.defaults.headers.common['Authorization'];

        return $http.jsonp(jsonUrl);


    }]);


})();

