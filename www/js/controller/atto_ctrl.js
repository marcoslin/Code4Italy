(function () {
    var app = angular.module("c4iapp");

    app.controller("AttoController", ["$scope", "$routeParams", "SPARQL", "$log", function ($scope, $routeParams, SPARQL, $log) {
        var deputato = $routeParams.deputato,
            deputato_param = "<" + deputato + ">"
            ;
        $scope.deputato = deputato;
        
        
        // Get atto related to a deputato
        var atto_sql = "select distinct * where { OPTIONAL {?atto ocd:primo_firmatario ?deputato. ?atto a ocd:atto.} OPTIONAL {?atto ocd:altro_firmatario ?deputato . ?atto a ocd:atto.} ?atto dc:title ?nomeAtto}";
            atto_sql = atto_sql.replace(/\?deputato/g, deputato_param);
        $log.log("query  ", atto_sql);
        

        SPARQL.getData(atto_sql).then(function (data) {
            $scope.atto_result = data.data.results.bindings;
            $scope.atto_count = $scope.atto_result.length;
            $log.log("Atto: ", $scope.atto_result);
        });

        // Get aci related to a deputato
        var aic_sql_01 = "select distinct * where { OPTIONAL {?aic ocd:primo_firmatario ",
            aic_sql_02 = " . ?aic a ocd:aic.} OPTIONAL {?aic ocd:altro_firmatario ",
            aic_sql_03 = ". ?aic a ocd:aic.} ?aic dc:title ?title. ?aic dc:description ?descrizione}",
            aic_sql = aic_sql_01 + deputato_param + aic_sql_02 + deputato_param + aic_sql_03;
            

        
        
        SPARQL.getData(aic_sql).then(function (data) {
            $scope.aic_result = data.data.results.bindings;
            $scope.aic_count = $scope.aic_result.length;
            $log.log("Aic: ", $scope.aic_result);
        });

        // Get intervento
        var intervento_sql_01 = "select distinct * where { OPTIONAL {?intervento ocd:rif_deputato ",
            intervento_sql_02 = " . ?intervento a ocd:intervento} ?intervento  dc:title ?interventoRif. }",
            intervento_sql = intervento_sql_01 + deputato_param + intervento_sql_02
            ;
        SPARQL.getData(intervento_sql).then(function (data) {
            $scope.intervento_result = data.data.results.bindings;
            $scope.intervento_count = $scope.intervento_result.length;
            $log.log("Intervento: ", $scope.intervento_result);
        });
        
        // Get deputato
        var deputato_full_sql = "SELECT DISTINCT "
                                    +"?deputato "
                                    +"?nome "
                                    +"?cognome "
                                    +"?dataNascita "
                                    +"?luogoNascita "
                                    +"?commissione "
                                    +"?img "
                                    +"?categoryY "
                                    +"?categoryX "
                                    +"?twitter "
                                    +"?facebook "
                                    +"?youtube "
                                +"WHERE { "
                                   +"?deputato a ocd:deputato; "
                                   +"foaf:firstName ?nome; "
                                   +"foaf:surname ?cognome; "
                                   +"foaf:gender ?categoryY ; "
                                   +"foaf:depiction ?img; "
                                   +"ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; " 
                                   +"ocd:rif_mandatoCamera ?mandato . "
                                   +"?persona ocd:rif_mandatoCamera ?mandato; a foaf:Person. "
                                   +"?mandato ocd:rif_elezione ?elezione . "
                                   +"FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } "
                                   +"?deputato ocd:aderisce ?aderisce. "
                                   +"OPTIONAL{ "
                                     +"?persona <http://purl.org/vocab/bio/0.1/Birth> ?nascita. "
                                     +"?nascita <http://purl.org/vocab/bio/0.1/date> ?dataNascita; "
                                     +"ocd:rif_luogo ?luogoNascitaUri.      "
                                     +"?luogoNascitaUri dc:title ?luogoNascita. "
                                   +"} "
                                   +"?aderisce ocd:rif_gruppoParlamentare ?gruppo. "
                                   +"?gruppo <http://purl.org/dc/terms/alternative> ?categoryX . "
                                   +"MINUS{?aderisce ocd:endDate ?fineAdesione} "
                                   +"?deputato ocd:membro ?membro.?membro ocd:rif_organo ?organo. "
                                   +"?organo dc:title ?commissione . "
                                   +"MINUS{?membro ocd:endDate ?fineMembership} "
                                    +"   OPTIONAL{?persona foaf:account ?accountTw. ?accountTw foaf:accountServiceHomepage ?twitter. FILTER(REGEX(STR(?twitter),'twitter.com'))} "
                                    +"   OPTIONAL{?persona foaf:account ?accountFb. ?accountFb foaf:accountServiceHomepage ?facebook. FILTER(REGEX(STR(?facebook),'facebook.com'))} "
                                     +"  OPTIONAL{?persona foaf:account ?accountYt . ?accountYt foaf:accountServiceHomepage ?youtube. FILTER(REGEX(STR(?youtube),'youtube.com'))} "
                                +"}";
        deputato_full_sql = deputato_full_sql.replace(/\?deputato/g, deputato_param);
        SPARQL.getData(deputato_full_sql).then(function (data) {
            var deputato = data.data.results.bindings;
            if (deputato.length > 1){
                for (var i = 0; i < deputato.length; i++){
                    if (deputato[0].commissione.value != deputato[i].commissione.value){
                        deputato[0].commissione.value += "\nCommissione: "+deputato[i].commissione.value;
                    }
                }
            }
            $scope.deputato_full = data.data.results.bindings[0];
            $log.log("Deputato full: ", $scope.deputato_full);
        });

        
        // Get leggi
        var leggi_sql = "select distinct * where {"
                            +"?atto a ocd:atto. "
                            +"{ "
                            +"{ "
                            +"  ?atto ocd:primo_firmatario ?deputato "
                            +"} "
                            +"UNION "
                            +"{ "
                            +"  ?atto ocd:altro_firmatario ?deputato "
                            +"} "
                            +"?deputato a ocd:deputato "
                            +"} "
                            +"?atto dc:title ?nomeAtto. "
                            +"?atto dc:description ?descrizioneAtto."
                            +"?legge a ocd:legge; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>. "
                            +"?legge ocd:lavoriPreparatori [?lavoro ?atto] "
                            +"} ";
        leggi_sql = leggi_sql.replace(/\?deputato/g, deputato_param);

        SPARQL.getData(leggi_sql).then(function (data) {
            $scope.leggi_result = data.data.results.bindings;
            $log.log("Leggi: ", $scope.leggi_result);
        });
        
        
    }]);
})();