#!/usr/bin/env python

from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
from rdflib.namespace import DC, FOAF

g = Graph()

OCD = Namespace("http://dati.camera.it/ocd/")

source_rdf = "../data/persona.rdf"
result = g.parse(source_rdf)

print "### graph has %s statements." % len(g)

for person in g.subjects(RDF.type, FOAF.Person):
    title = g.value(person, DC.title)
    print "# %s predicates:" % title
    for p, o in g.predicate_objects(person):
        print "  %s: %s" % (p,o)

