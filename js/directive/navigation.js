(function () {
    var app = angular.module("c4iapp");

    app.directive('navMenu', ["navTextUpdater", "$route", "$log", function (navTextUpdater, $route, $log) {
        return {
            restrict: 'EA',
            templateUrl: 'js/directive/template/navMenu.html',
            controller: function ($scope) {
                var curTab = $route.current.navTab;
                $log.log("curTab: ", curTab);

                // Set tab
                $scope.fs = {
                    home_class: "active",
                    team_class: "",
                    contact_class: ""
                };

                if (curTab === "team") {
                    $scope.fs = {
                        home_class: "",
                        team_class: "active",
                        contact_class: ""
                    };
                } else if (curTab === "contact") {
                    $scope.fs = {
                        home_class: "",
                        team_class: "",
                        contact_class: "active"
                    };
                } else {
                    $scope.fs = {
                        home_class: "active",
                        team_class: "",
                        contact_class: ""
                    };
                }


                // Update Navigation Text
                navTextUpdater.update(function (message) {
                    // This is called is involked from jquery.maphilight so apply is needed
                    $log.log("Update:", message);
                    $scope.navigationText = message;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                });
            }
        };
    }]);

})();
