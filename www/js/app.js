(function () {

    var app = angular.module("c4iapp", ['ngRoute','ui.bootstrap']);

    // Define application wide basic constants
    app.constant("CameraData", {
        legislatura_uri: "http://dati.camera.it/ocd/legislatura.rdf/repubblica_17",
        collegio: [
            { "id": "ABRUZZO", "desc": "Abruzzo"},
            { "id": "BASILICATA", "desc": "Basilicata"},
            { "id": "CALABRIA", "desc": "Calabria"},
            { "id": "CAMPANIA 1", "desc": "Campania 1"},
            { "id": "CAMPANIA 2", "desc": "Campania 2"},
            { "id": "EMILIA-ROMAGNA", "desc": "Emilia-Romagna"},
            { "id": "FRIULI-VENEZIA GIULIA", "desc": "Friuli-Venezia Giulia"},
            { "id": "LAZIO 1", "desc": "Lazio 1"},
            { "id": "LAZIO 2", "desc": "Lazio 2"},
            { "id": "LIGURIA", "desc": "Liguria"},
            { "id": "LOMBARDIA 1", "desc": "Lombardia 1"},
            { "id": "LOMBARDIA 2", "desc": "Lombardia 2"},
            { "id": "LOMBARDIA 3", "desc": "Lombardia 3"},
            { "id": "MARCHE", "desc": "Marche"},
            { "id": "MOLISE", "desc": "Molise"},
            { "id": "PIEMONTE 1", "desc": "Piemonte 1"},
            { "id": "PIEMONTE 2", "desc": "Piemonte 2"},
            { "id": "PUGLIA", "desc": "Puglia"},
            { "id": "SARDEGNA", "desc": "Sardegna"},
            { "id": "SICILIA 1", "desc": "Sicilia 1"},
            { "id": "SICILIA 2", "desc": "Sicilia 2"},
            { "id": "TOSCANA", "desc": "Toscana"},
            { "id": "TRENTINO-ALTO ADIGE", "desc": "Trentino-Alto Adige"},
            { "id": "UMBRIA", "desc": "Umbria"},
            { "id": "VALLE D'AOSTA", "desc": "Valle d'Aosta"},
            { "id": "VENETO 1", "desc": "Veneto 1"},
            { "id": "VENETO 2", "desc": "Veneto 2"}
        ],
        collegioOther: [
            { "id": "AFRICA, ASIA, OCEANIA E ANTARTIDE", "desc": "Africa, Asia, Oceania e Antartide"},
            { "id": "AMERICA MERIDIONALE", "desc": "America Meridionale"},
            { "id": "AMERICA SETTENTRIONALE E CENTRALE", "desc": "America Settentrionale e Centrale"},
            { "id": "EUROPA", "desc": "Europa"}
        ]
    });

    // Define application route
    app.config(['$routeProvider', '$sceProvider', function ($routeProvider, $sceProvider) {
        $sceProvider.enabled(false)

        $routeProvider
            .when('/home', { templateUrl: "views/home.html", controller: "HomeController"} )
            .when('/deputato', { templateUrl: "views/deputato.html", controller: "DeputatoController"} )
            .when('/atto', { templateUrl: "views/atto.html", controller: "AttoController"} )
            .when('/team', { templateUrl: "views/team.html", navTab: "team"} )
            .when('/contact', { templateUrl: "views/contact.html", navTab: "contact"} )

            .when('/sparql', { templateUrl: "views/sparql.html", controller: "HomeController"} )
            .otherwise({redirectTo: '/home'})
        ;
    }]);

})();

