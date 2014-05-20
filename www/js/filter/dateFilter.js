
//date format, pattern="dd/MM/yyyy"
 
angular.module('c4iapp').filter('birthDate', function($filter)
{
	 return function(input)
	 {
		if(input == null){ return ""; } 
	 
		var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
	 
		return _date.toUpperCase();

	 };
});