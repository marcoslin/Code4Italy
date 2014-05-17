
(function () {

    var app = angular.module("c4iapp");

    app.controller("HomeController", ["$scope", "SPARQL", "$log", function ($scope, SPARQL, $log) {
        var sql_collegio = "select+count%28distinct+%3Fdeputato%29+%3Fcollegio+%0D%0Awhere+%7B%0D%0A++++%3Fdeputato+a+ocd%3Adeputato%3B+ocd%3Arif_leg+%3Chttp%3A%2F%2Fdati.camera.it%2Focd%2Flegislatura.rdf%2Frepubblica_17%3E%3B+ocd%3Arif_mandatoCamera+%3Fmandato+.%0D%0A++++%3Fmandato+ocd%3Arif_elezione+%3Felezione+.%0D%0A++++%3Felezione+dc%3Acoverage+%3Fcollegio+.%0D%0A++++FILTER+NOT+EXISTS%7B%0D%0A++++++++%3Fmandato+ocd%3AendDate+%3Fdate%0D%0A++++%7D%0D%0A%7D%0D%0Agroup+by+%3Fcollegio";

        SPARQL.getData(sql_collegio).then(function (data) {
            $log.log("Data: ", data);

            $scope.result = data.data.results.bindings;

            $log.log("Result: ", $scope.result);

        });
    }]);

    app.controller("DeputatoController", ["$scope", "$routeParams", "SPARQL", "$log", function ($scope, $routeParams, SPARQL, $log) {
        //DeputatoController
        var collegio = $routeParams.collegio,
            sql_pre = "select distinct ?deputato where { ?deputato a ocd:deputato; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage \"",
            sql_pos = "\" . FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } }",
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

