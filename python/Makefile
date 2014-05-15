#!/bin/bash

# ===========================================================
# Author:   Marcos Lin
# Created:	3 May 2013
#
# Makefile used to setup PyAngo application
#
# ===========================================================

SRC           = src
PYENV         = pyenv
PIP           = $(PYENV)/bin/pip
PYLIB_REQ     = pylib_req.txt


# ------------------
# USAGE: First target called if no target specified
man :
	@cat readme.make
	@cat pylib_req.txt

# ------------------
# Define file needed
$(PIP) :
ifeq ($(shell which virtualenv),)
	$(error virtualenv command needed to be installed.)
endif
	@mkdir -p $(PYENV)
	@virtualenv $(PYENV)

# $(foreach dir, $(LIB_DIRS), $(wildcard $(SRC)/$(dir)/*))


$(PYENV)/pylib_req.txt : $(PYLIB_REQ)
	@$(PIP) install -r $(PYLIB_REQ)
	@cp -a $(PYLIB_REQ) $@
	@echo "/Developer/Google/google_appengine" > $(PYENV)/lib/python2.7/site-packages/google_appengine.pth


# ------------------
# MAIN TARGETS	
virtualenv : $(PIP)

setup : virtualenv $(PYENV)/pylib_req.txt



# ------------------
# DEFINE PHONY TARGET: Basically all targets
.PHONY : \
	man virtualenv setup

