(function () {

    var app = angular.module("c4iapp");

    app.controller("HomeController", ["$scope", "SPARQL", "CameraData", "$location", "$log", function ($scope, SPARQL, CameraData, $location, $log) {

        SPARQL.getData("select_collegio", CameraData).then(function (data) {

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

        $scope.goToCollegio = function (collegio) {
            $log.log("goToCollegio: ", collegio);
            $location.path("deputato").search("collegio", collegio);
        };

        // Initialize mapper.js
        $('.mapper').maphilight().parent().addClass("center-map");
    }]);

})();

