(function () {
    var app = angular.module("c4iapp");

    app.directive('circleImage', ["$log", function ($log) {
        return {
            restrict: 'E',
            scope: {
                class: "@",
                src: "@"
            },
            templateUrl: 'js/directive/template/circleImage.svg'
        };
    }]);

})();
