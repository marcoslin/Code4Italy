#!/usr/bin/env python

'''
Sample code on:
* How to persist parsed data to the database
* How to write select statement on the joined data
'''

import sys
import os
import pprint

from SPARQLWrapper import SPARQLWrapper, JSON
spl = SPARQLWrapper("http://dati.camera.it/sparql")


# SQL Statement showing linked data
# From title from persona.rdf to city in luogo.rdf
sql = """
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX bio: <http://purl.org/vocab/bio/0.1/>
PREFIX ocd: <http://dati.camera.it/ocd/>

SELECT ?title ?bdate ?city
WHERE {
    ?x dc:title ?title .
    ?x bio:Birth ?birth .
    ?birth ocd:rif_luogo ?luogo .
    ?birth bio:date ?bdate .
    ?luogo dc:title ?city .
    ?luogo ocd:parentADM3 "LOMBARDIA"
}
"""

spl.setQuery(sql)
spl.setReturnFormat(JSON)
qres = spl.query().convert()

pprint.pprint(qres)

