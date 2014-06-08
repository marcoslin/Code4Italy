(function () {
    var app = angular.module("c4iapp");

    app.controller("AttoController", ["$scope", "$routeParams", "SPARQL", "CameraData", "$log", function ($scope, $routeParams, SPARQL, CameraData, $log) {
        var deputato = $routeParams.deputato,
            params = {
                legislatura_uri: CameraData.legislatura_uri,
                deputato: deputato
            },
            deputato_param = "<" + deputato + ">";

        $scope.deputato = deputato;

        /*
         * Define CSS based on presence of touch event as `overflow: hidden`
         * should not be used on a mobile device.
         */
        if (Modernizr.touch) {
            $scope.tableFixedSize = "table-fixed-size-touch";
        } else {
            $scope.tableFixedSize = "table-fixed-size";
        }
        $log.log("fs: ", $scope.tableFixedSize);

        // Get atto related to a deputato
        SPARQL.getData("select_atto", params).then(function (data) {
            $scope.atto_result = data.data.results.bindings;
            $scope.atto_count = $scope.atto_result.length;
            // $log.log("Atto: ", $scope.atto_result);
        });

        // Get aci related to a deputato
        SPARQL.getData("select_aic", params).then(function (data) {
            $scope.aic_result = data.data.results.bindings;
            $scope.aic_count = $scope.aic_result.length;
             //$log.log("Aic: ", $scope.aic_result);
        });

        // Get intervento
        SPARQL.getData("select_intervento", params).then(function (data) {
            $scope.intervento_result = data.data.results.bindings;
            $scope.intervento_count = $scope.intervento_result.length;
            // $log.log("Intervento: ", $scope.intervento_result);
        });

        // Get Legge
        SPARQL.getData("select_legge", params).then(function (data) {
            $scope.leggi_result = data.data.results.bindings;
             //$log.log("Leggi: ", $scope.leggi_result);
        });

        // Get deputato
        SPARQL.getData("select_bio", params).then(function (data) {
            var deputato = data.data.results.bindings;
            if (deputato.length > 0) {
                $scope.deputato_full = data.data.results.bindings[0];
                // $log.log("Deputato full: ", $scope.deputato_full);
            }

        });

        // Get Commissione
        SPARQL.getData("select_commissione", params).then(function (data) {
            var comm = data.data.results.bindings,
                res_comm = [];
            for (var i = 0; i < comm.length; i += 1) {
                res_comm.push(comm[i].commissione.value);
            }
            $scope.deputato_commissione = res_comm;
        });

        // Get Votazioni
        SPARQL.getData("select_votazione", params).then(function (data) {
            //$log.log("select_votazione data: ", votes);
            var votes = data.data.results.bindings,
                total_count = 0,
                result = {};

            for (var i = 0; i < votes.length; i += 1) {
                var vote = votes[i],
                    vote_type = vote.type.value,
                    vote_count = parseInt(vote.count.value);

                // Count only act of voting, excluding missing or not voted
                if (vote_type!=="Astensione" && vote_type!=="Non ha votato") {
                    total_count += vote_count;
                }

                // Add different vote type to result
            	if (vote_type === "Favorevole") {
                    result.favore = vote_count;
            	} else if (vote_type == "Contrario") {
                    result.contrari = vote_count;
            	} else if (vote_type == "Astensione") {
                    result.astensione = vote_count;
                } else if (vote_type == "Ha votato") {
                    result.votato = vote_count;
                } else if (vote_type == "Non ha votato") {
                    result.non_votato = vote_count;
                }

            }
            result.total = total_count;

            $scope.voti = result;

        });
        
    }]);
})();