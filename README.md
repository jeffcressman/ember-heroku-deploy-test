# Ember-heroku

I'm having some difficulty deploying an Ember CLI app to Heroku. I suspect the problem has to do with the [ember-cli-bootstrap](https://github.com/dockyard/ember-cli-bootstrap) add-on as described [here](https://github.com/ember-addons/bootstrap-for-ember/issues/168) and [here](https://github.com/stefanpenner/ember-cli/issues/1727)

To verify this is the issue I'm going to start with a fresh Ember CLI app, deploy it to Heroku, and then progressively add components that I need and re-deploy.

## Create the Heroku app

```bash
heroku create ember-deploy-test --buildpack https://github.com/tonycoco/heroku-buildpack-ember-cli.git
```

## Deploy

```bash
git push heroku master
```

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

