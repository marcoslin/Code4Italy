
//parsing data nascita, pattern="dd/MM/yyyy" 
angular.module('c4iapp').filter('birthDate', ["$filter", "$log", function($filter, $log) {
    return function (input) {
        // Make sure a YYYYMMDD is passed
        if(!/^(\d){8}$/.test(input)){
            return "";
        }

        //var dataNascita = $filter('birthDate')(new Date(input), 'dd/MM/yyyy');
        var year = input.substr(0,4),
            month = input.substr(4,2),
            day = input.substr(6,2),
            bdate = new Date(year,month,day);

        return bdate.getDate() + "/" + bdate.getMonth()  + "/" + bdate.getYear();

    };
}]);

//parsing sesso(ita)
angular.module('c4iapp').filter('gender', ["$filter", "$log", function($filter, $log) {
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
