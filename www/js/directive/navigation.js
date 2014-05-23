(function () {
    var app = angular.module("c4iapp");

    app.directive('navMenu', ["navTextUpdater", "$log", function (navTextUpdater, $log) {
        return {
            restrict: 'EA',
            templateUrl: 'js/directive/template/navMenu.html',
            controller: function ($scope) {
                navTextUpdater.update(function (message) {
                    // This is called is involked from jquery.maphilight so apply is needed
                    $scope.$apply(function () {
                        $scope.navigationText = message;
                    });

                });
            }
        };
    }]);

})();
