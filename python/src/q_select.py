#!/usr/bin/env python

'''
Sample code on:
* How to persist parsed data to the database
* How to write select statement on the joined data
'''

import sys
import os
from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
from rdflib.namespace import DC, FOAF

# Define core variables
DATADIR = "../data"
DBDIR = "./store.db"

OCD = Namespace("http://dati.camera.it/ocd/")

# Initialization
g = Graph(store = "Sleepycat", identifier = 'urn:my:graph')

# Parse data from source if needed
if os.path.isdir(DBDIR):
    parse_data = False
else:
    parse_data = True

g.open("store.db", create=parse_data)
if parse_data:
    print "### Parsing data"
    g.parse(DATADIR + "/persona.rdf")
    g.parse(DATADIR + "/luogo.rdf")


stmt_count = len(g)

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

lcounter = 0
qres = g.query(sql)

for row in qres:
    lcounter += 1
    print "# %s: %s [%s]" % row


print "\n### graph has %s statements." % stmt_count
print "### Line processed: %s" % lcounter

g.close()
