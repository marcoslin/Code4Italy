
//parsing data nascita, pattern="dd/MM/yyyy" 
angular.module('c4iapp').filter('birthDate', function($filter)
{
	 return function(input)
	 {
		if(input == null){ return ""; } 
	 
		//var dataNascita = $filter('birthDate')(new Date(input), 'dd/MM/yyyy');
		var anno, mese, giorno;

  		anno = input.substr(0,4);
  		mese = input.substr(4,2);
  		giorno = input.substr(6,2);
		var dataNascita = giorno + "/" + mese + "/" + anno;
	 
		return dataNascita.toUpperCase();

	 };
});

//parsing sesso(ita)
angular.module('c4iapp').filter('gender', function($filter)
{
	 return function(input)
	 {
		if(input == null){ return ""; } 
	 
		var sesso;
        if(input == 'male'){
        	sesso = 'maschile';
        }
        else if(input == 'female'){
        	sesso = 'femminile';
        }	 
		return sesso.toUpperCase();
	 };
});
