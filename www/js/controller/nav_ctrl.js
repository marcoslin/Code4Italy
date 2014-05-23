(function () {
    var app = angular.module("c4iapp");

    app.controller("navMenuController", ["$scope", "navTextUpdater", "$log", function ($scope, navTextUpdater, $log) {
        navTextUpdater.update(function (message) {
            $scope.navigationText = message;
        });
    }]);

})();