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
            var in_data = data.data.results.bindings,
                res_deputato = [],
                result = {},
                x_values = {},
                y_values = {}
            ;

            for (var i=0; i<in_data.length; i+=1) {
                var row = in_data[i],
                    catX = row.categoryX.value,
                    catY = row.categoryY.value,
                    refid = row.deputato.value,
                    img = row.img.value,
                    title = row.nome.value + " " + row.cognome.value
                ;
                // Create core object
                var obj = {
                    "refid": refid,
                    "title": title,
                    "categoryX": catX,
                    "categoryY": catY,
                    "img": img
                };

                res_deputato.push(obj);
                // Create object
                x_values[catX] = 1;
                y_values[catY] = 1;

                // Create result
                if (typeof result[catX] === "undefined") {
                    result[catX] = {};
                    result[catX][catY] = [obj];
                } else if (typeof result[catX][catY] === "undefined") {
                    result[catX][catY] = [obj];
                } else {
                    result[catX][catY].push(obj);
                }

            }


            $scope.result = res_deputato;
            $scope.xValues = x_values;
            $scope.yValues = y_values;

            $scope.result2 = result;
            $scope.row_count = $scope.result.length;
            $log.log("Deputato: ", result);
            $log.log("X: ", x_values);
            $log.log("Y: ", y_values);
        });

        // Layout

    }]);
})();