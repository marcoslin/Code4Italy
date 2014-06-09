(function () {
    var app = angular.module("c4iapp");

    app.controller("DeputatoController", ["$scope", "$routeParams", "SPARQL", "CameraData", "navTextUpdater", "$log", function ($scope, $routeParams, SPARQL, CameraData, navTextUpdater, $log) {
        //DeputatoController
        var collegio = $routeParams.collegio,
            params = {
                legislatura_uri: CameraData.legislatura_uri,
                collegio: collegio
            };

        SPARQL.initialize($scope);

        SPARQL.getData("select_deputato", params).then(function (data) {
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

            navTextUpdater.set(collegio);

        });

        // Layout

    }]);
})();