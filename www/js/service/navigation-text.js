!function () {

    var app = angular.module("c4iapp");

    app.service("navTextUpdater", ["$log", function ($log) {
        var priv_callback;

        this.update = function (callback) {
            priv_callback = callback;
        }

        this.set = function (message) {
            priv_callback(message);
        };
    }]);
}()
