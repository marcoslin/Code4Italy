
//date format, pattern="dd/MM/yyyy"
 
angular.module('c4iapp').filter('birthDate', function($filter)
{
	 return function(input)
	 {
		if(input == null){ return ""; } 
	 
		var year, month, day;

  		year = input.substr(0,4);
  		month = input.substr(4,2);
  		day = input.substr(6,2);
		var _date = day + "/" + month + "/" + year;
	 
		return _date.toUpperCase();

	 };
});

angular.module('c4iapp').filter('translate', function($filter)
{
	 return function(input)
	 {
		if(input == null){ return ""; } 
	 
		var it_gender;
        if(input == 'male'){
        	it_gender = 'maschio';
        }
        else if(input == 'female'){
        	it_gender = 'femmina';
        } 
  		
	 
		return it_gender.toUpperCase();

	 };
});