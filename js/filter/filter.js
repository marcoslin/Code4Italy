(function () {
    var app = angular.module('c4iapp');

    /**
     * Format YYYYMMDD date into DD/MM/YY
     */
    app.filter('birthDate', ["$filter", "$log", function($filter, $log) {
        return function (input) {
            // Make sure a YYYYMMDD is passed
            if(!/^(\d){8}$/.test(input)){
                return "";
            }

            //var dataNascita = $filter('birthDate')(new Date(input), 'dd/MM/yyyy');
            var year = input.substr(0,4),
                month = input.substr(4,2),
                day = input.substr(6,2);
                //bdate = new Date(year,month,day);

            return day + "/" + month  + "/" + year;

        };
    }]);

    /**
     * Translate english gender into Italian
     */
    app.filter('gender', ["$filter", "$log", function($filter, $log) {
        return function(input) {
            if (typeof input === "undefined") {
                return input;
            } else if (/^male/i.test(input)) {
                return "maschile";
            } else if (/^female/i.test(input)) {
                return "femminile";
            } else {
                $log.error("Unrecognized gender string: ", input);
                return input;
            }
        };
    }]);

    /**
     * Truncate the long string and append "..." to the end
     */
    app.filter('ellipsis', ["$filter", "$log", function ($log) {
        var maxLength = 100;

        return function(input) {
            if (typeof input === "undefined") {
                return undefined;
            } else {
                if (input.length > maxLength) {
                    var result = input.substr(0,maxLength);
                    return result + " ...";
                } else {
                    return input;
                }
            }
        };
    }]);

    /**
     * Generate Twitter Intent URL with user name
     */
    app.filter('twitterIntent', ["$filter", "$log", function ($log) {
        var url = "https://twitter.com/intent/tweet?screen_name=",
            tw_regex = /\/(\w+)$/;

        return function(input) {
            var result = input;
            // $log.log("TWITTERINTENT input: ", input);
            if (typeof input !== "undefined") {
                var m = tw_regex.exec(input);
                if (m && m[1]) {
                    result = url + m[1];;
                }
            }
            return result;
        };
    }]);

})();
