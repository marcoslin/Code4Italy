(function () {

    var app = angular.module("c4iapp");

    app.controller("HomeController", ["$scope", "SPARQL", "$log", function ($scope, SPARQL, $log) {
        var sql_collegio = "select count(distinct ?deputato) as ?count ?collegio where { ?deputato a ocd:deputato; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage ?collegio . FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } } group by ?collegio";

        SPARQL.getData(sql_collegio).then(function (data) {

            var in_data = data.data.results.bindings,
                in_data_count = in_data.length,
                result = {}
                ;

            for (var i=0; i < in_data_count; i += 1) {
                var key = in_data[i].collegio.value,
                    val = in_data[i].count.value;
                $log.log("Key: ", key, "; Value: ", val);
                result[key] = val;

            }

            $scope.result = result;

            $log.log("Result: ", $scope.result);

        });
    }]);

})();

