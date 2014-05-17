
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

    app.controller("AttoController", ["$scope", "$routeParams", "SPARQL", "$log", function ($scope, $routeParams, SPARQL, $log) {
        var deputato = $routeParams.deputato,
            deputato_param = "<" + deputato + ">"
        ;
        $scope.deputato = deputato;

        // Get atto related to a deputato
        var atto_sql_01 = "select distinct * where { OPTIONAL {?atto ocd:primo_firmatario ",
            atto_sql_02 = " . ?atto a ocd:atto.} OPTIONAL {?atto ocd:altro_firmatario ",
            atto_sql_03 = " . ?atto a ocd:atto.} }",
            atto_sql = atto_sql_01 + deputato_param + atto_sql_02 + deputato_param + atto_sql_03;
        ;

        SPARQL.getData(atto_sql).then(function (data) {
            $scope.atto_result = data.data.results.bindings;
            $scope.atto_count = $scope.atto_result.length;
            $log.log("Atto: ", $scope.atto_result);
        });

        // Get aci related to a deputato
        var aic_sql_01 = "select distinct * where { OPTIONAL {?aic ocd:primo_firmatario ",
            aic_sql_02 = " . ?aic a ocd:aic.} OPTIONAL {?aic ocd:altro_firmatario ",
            aic_sql_03 = ". ?aic a ocd:aic.} }",
            aic_sql = aic_sql_01 + deputato_param + aic_sql_02 + deputato_param + aic_sql_03
        ;
        SPARQL.getData(aic_sql).then(function (data) {
            $scope.aic_result = data.data.results.bindings;
            $scope.aic_count = $scope.aic_result.length;
            $log.log("Aic: ", $scope.aic_result);
        });

        // Get intervento
        var intervento_sql_01 = "select distinct * where { OPTIONAL {?intervento ocd:rif_deputato ",
            intervento_sql_02 = " . ?intervento a ocd:intervento} }",
            intervento_sql = intervento_sql_01 + deputato_param + intervento_sql_02
        ;
        SPARQL.getData(intervento_sql).then(function (data) {
            $scope.intervento_result = data.data.results.bindings;
            $scope.intervento_count = $scope.intervento_result.length;
            $log.log("Intervento: ", $scope.intervento_result);
        });


    }]);




})();

