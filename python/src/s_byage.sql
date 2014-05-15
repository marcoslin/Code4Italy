PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX bio: <http://purl.org/vocab/bio/0.1/>
PREFIX ocd: <http://dati.camera.it/ocd/>

SELECT ?x ?title ?gender ?bdate ?city
WHERE {
    ?x dc:title ?title .
    ?x bio:Birth ?birth .
    ?x foaf:gender ?gender .
    ?birth ocd:rif_luogo ?luogo .
    ?birth bio:date ?bdate . FILTER (xsd:decimal(?bdate) > 19800101) .
    ?luogo dc:title ?city
}
ORDER BY ?bdate

