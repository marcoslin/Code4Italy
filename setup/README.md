# Setup for the "Intro to D3.JS" project

## Directory Setup
The setup expect a `master` and a `gh-pages` subdirectory to handle deployment of the `intro` website
to GitHub Pages webserver.

```
innaas/master/    <- Clone of github `master` branch
innaas/gh-pages/  <- Clone of the github `gh-pages` branch
```


## Prerequisites
You must have [node.js](http://nodejs.org/) installed in order to use this setup.


## Installation
After cloning this project into `innaas/master`, do the following:

```
cd innaas/master/setup/

# Install all the package needed by setup
npm install

# Download the needed JS components and copy to the `../www/js/ext/` directory
grunt setup
```

## Development
In the `innaas/master/setup` directory, run:

```
grunt devel
```

and point your browser to [http://localhost:8080/](http://localhost:8080/).  `devel` task will now what
the changes made to `../www/` and auto reload your browser when needed.

## Deployment
After committing the changes in the `innaas/master/` directory, do:

```
grunt deploy
```

Now, switch to `innaas/gh-pages/` then commit and push the changes.  You should be able to see the updated at:

[http://marcoslin.github.io/innaas/](http://marcoslin.github.io/innaas/)


