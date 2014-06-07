!function () {
    var app = angular.module("c4iapp");

    app.factory("BrowserCheck", ['$log', function ($log) {
        /*
         * WARNING: the modernizr used is a custom build so only the feature below are recognized.
         * You must create a new build if adding additional checks.
         */
        var keyFeatures = ['opacity', 'svg', 'inlinesvg', 'svgclippaths', 'borderradius', 'generatedcontent'];
        return {
            isBrowserCompatible: function () {
                var checkResult = true;
                for (var i=0; i < keyFeatures.length; i += 1) {
                    var feature = keyFeatures[i];
                    // $log.log("Checking for feature: " + feature);
                    if (!Modernizr[feature]) {
                        $log.error("isBrowserCompatible failed on feature: " + feature);
                        checkResult = false;
                        break;
                    }
                }
                return checkResult;
            }
        }
    }]);

}();