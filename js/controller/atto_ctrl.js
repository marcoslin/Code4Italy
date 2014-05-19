(function () {
    var app = angular.module("c4iapp");

    app.controller("AttoController", ["$scope", "$routeParams", "SPARQL", "CameraData", "$log", function ($scope, $routeParams, SPARQL, CameraData, $log) {
        var deputato = $routeParams.deputato,
            params = {
                legislatura_uri: CameraData.legislatura_uri,
                deputato: deputato
            },
            deputato_param = "<" + deputato + ">"
        ;

        $scope.deputato = deputato;

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
            // $log.log("Aic: ", $scope.aic_result);
        });

        // Get intervento
        SPARQL.getData("select_intervento", params).then(function (data) {
            $scope.intervento_result = data.data.results.bindings;
            $scope.intervento_count = $scope.intervento_result.length;
            // $log.log("Intervento: ", $scope.intervento_result);
        });
        
        // Get deputato
        SPARQL.getData("select_bio", params).then(function (data) {
            var deputato = data.data.results.bindings;
            if (deputato.length > 1){
                for (var i = 0; i < deputato.length; i++){
                    if (deputato[0].commissione.value != deputato[i].commissione.value){
                        deputato[0].commissione.value += "\nCommissione: "+deputato[i].commissione.value;
                    }
                }
            }
            $scope.deputato_full = data.data.results.bindings[0];
            // $log.log("Deputato full: ", $scope.deputato_full);
        });

        
        // Get Legge
        SPARQL.getData("select_legge", params).then(function (data) {
            $scope.leggi_result = data.data.results.bindings;
            // $log.log("Leggi: ", $scope.leggi_result);
        });
        
        
    }]);
})();