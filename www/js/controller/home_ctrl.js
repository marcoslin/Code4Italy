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

        SPARQL.getData("select_deputato", CameraData).then(function (data) {

            var in_data = data.data.results.bindings,
                in_data_len = in_data.length,
                result = []
                ;

            for (var i=0; i<in_data_len; i += 1) {
                var row = in_data[i],
                    result_row = {
                        "id": row.deputato.value,
                        "desc": row.name.value + ', ' + row.partito.value + ', ' + row.collegio.value
                    };
                result.push(result_row);
            }

            $scope.deputato_list = result;
            $log.log("Loaded " + in_data_len + " deputato");

        });



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

        $scope.deputatoSearch = function () {
            // $log.log("Selected: ", $scope.selected_deputato);
            $location.path("atto").search("deputato", $scope.selected_deputato.id);
        }

        // Expose data to view
        $scope.collegio = CameraData.collegio;
        $scope.collegioOther = CameraData.collegioOther;

        // Initialize mapper.js
        $('.mapper').maphilight().parent().addClass("center-map");
    }]);

})();

