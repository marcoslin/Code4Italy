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
    gender = g.value(person, FOAF.gender)
    
    print "# %s: %s" % (title, gender)
    print "- Camera"
    for camera in g.objects(person, OCD.rif_mandatoCamera):
        print "  %s" % camera
        
    print "- Senato"
    for senato in g.objects(person, OCD.rif_mandatoSenato):
        print "  %s" % senato 


