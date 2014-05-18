(function () {
    var app = angular.module("c4iapp");

    app.controller("DeputatoController", ["$scope", "$routeParams", "SPARQL", "$log", function ($scope, $routeParams, SPARQL, $log) {
        //DeputatoController
        var collegio = $routeParams.collegio,
            sql_pre = "select distinct ?deputato ?nome ?cognome ?img ?categoryY ?categoryX where { ?deputato a ocd:deputato; foaf:firstName ?nome; foaf:surname ?cognome; foaf:gender ?categoryY ; foaf:depiction ?img; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage \"",
            sql_pos = "\" FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } ?deputato ocd:aderisce ?aderisce . ?aderisce ocd:rif_gruppoParlamentare ?gruppo . ?gruppo <http://purl.org/dc/terms/alternative> ?categoryX . MINUS{?aderisce ocd:endDate ?fineAdesione} }",
            sql_deputato = sql_pre + collegio + sql_pos
            ;

        $scope.collegio = collegio;

        $log.log("collegio: ", collegio);

        SPARQL.getData(sql_deputato).then(function (data) {
            $scope.result = data.data.results.bindings;
            $scope.row_count = $scope.result.length;
            $log.log("Deputato: ", $scope.result);
        });

    }]);
})();