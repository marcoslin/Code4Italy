[![Gitter chat](https://badges.gitter.im/marcoslin/Code4Italy.png)](https://gitter.im/marcoslin/Code4Italy)

# Setup for the "Camera4Dummies" project

## Directory Setup
The setup expect a `master` and a `gh-pages` subdirectory to handle deployment of the `Camera4Dummies`
website to GitHub Pages webserver.

```
Code4Italy/master/    <- Clone of github `master` branch
Code4Italy/gh-pages/  <- Clone of the github `gh-pages` branch
```


## Prerequisites
1. You must have [node.js](http://nodejs.org/) installed in order to use this setup.
2. You must have installed `grunt` using `sudo npm install -g grunt-cli`



## Installation
After cloning this project into `Code4Italy/master`, do the following:

```
cd Code4Italy/master/setup/

# Install all the package needed by setup
npm install

# Download the needed JS components and copy to the `../www/js/ext/` directory
grunt setup
```

## Development
In the `Code4Italy/master/setup` directory, run:

```
grunt devel
```

and point your browser to [http://localhost:8080/](http://localhost:8080/).  `devel` task will now watch
the changes made to `../www/` and auto reload your browser when needed.

## Deployment
After committing the changes in the `Code4Italy/master/` directory, do:

```
grunt deploy
```

Now, switch to `Code4Italy/gh-pages/`, add, commit and push the changes.  You should be able to see the updated at:

[http://marcoslin.github.io/Code4Italy/](http://marcoslin.github.io/Code4Italy/)


