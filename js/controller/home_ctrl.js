(function () {

    var app = angular.module("c4iapp");

    app.controller("HomeController", ["$scope", "SPARQL", "CameraData", "$location", "$log", function ($scope, SPARQL, CameraData, $location, $log) {
        /*
         * Skipping the select_collegio call for now as we are not displaying the count
         *
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
        */

        $scope.goToCollegio = function (collegio) {
            $log.log("goToCollegio: ", collegio);
            $location.path("deputato").search("collegio", collegio);
        };

        $scope.otherRegions = {
            "EUROPA": "Europa",
            "AMERICA MERIDIONALE": "America Meridionale",
            "AFRICA, ASIA, OCEANIA E ANTARTIDE": "Africa, Asia, Oceania e Antartide",
            "AMERICA SETTENTRIONALE E CENTRALE": "America Settentrionale e Centrale"
        };

        // Initialize mapper.js
        $('.mapper').maphilight().parent().addClass("center-map");
    }]);

})();

