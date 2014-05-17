(function () {

    var app = angular.module("c4iapp");

    app.service("SPARQL", ["$http", function ($http) {

        this.getData = function (sql) {
            var url_pre = "http://dati.camera.it/sparql?default-graph-uri=&query=",
                url_pos = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK",
                url = url_pre + sql + url_pos;

            return $http.jsonp(url);
        };

    }]);


})();

