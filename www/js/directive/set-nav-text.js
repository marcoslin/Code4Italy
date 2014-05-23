(function () {
    var app = angular.module("c4iapp");

    app.directive('setNavText', ["navTextUpdater", "$log", function (navTextUpdater, $log) {
        return {
            scope: {},
            restrict: 'A',
            link: function (scope, elm, attr) {
                var message = attr.alt;
                elm.bind("mouseover", function () {
                    navTextUpdater.set(message);
                });
                elm.bind("mouseleave", function () {
                    navTextUpdater.set("");
                });
            }
        };
    }]);

})();
