(function () {
    var app = angular.module("c4iapp");

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