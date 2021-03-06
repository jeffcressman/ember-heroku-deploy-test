# Ember-heroku

I'm having some difficulty deploying an Ember CLI app to Heroku. I suspect the problem has to do with the [ember-cli-bootstrap](https://github.com/dockyard/ember-cli-bootstrap) add-on as described [here](https://github.com/ember-addons/bootstrap-for-ember/issues/168) and [here](https://github.com/stefanpenner/ember-cli/issues/1727)

To verify this is the issue I'm going to start with a fresh Ember CLI app, deploy it to Heroku, and then progressively add components that I need and re-deploy.

Working with Ember CLI

```
version: 0.0.44
node: 0.10.31
npm: 1.4.26
```

## Create the Heroku app

```bash
heroku create ember-heroku-deploy-test --buildpack https://github.com/tonycoco/heroku-buildpack-ember-cli.git
```

## Deploy

```bash
git push heroku master
```

## Test

<http://ember-heroku-deploy-test.herokuapp.com/>

## Issue #1 ember-cli-boostrap

```bash
npm install --save-dev ember-cli-bootstrap@0.0.10
```

Confirmed. installing ember-cli-boostrap@0.0.10 yields

``` javascript
Uncaught TypeError: undefined is not a function 
```

## Fix Attempt #1

Attempting [this](https://github.com/ember-addons/bootstrap-for-ember/issues/168) fix.

```bash
npm install --save-dev broccoli-merge-trees
npm install --save-dev broccoli-static-compiler
```

Fail. Apparently there was a problem with the paths I was providing. Perhaps it could have been fixed. I switched from `bower_components` to `node_modules` as the top level directory because the npm package `ember-cli-bootstrap` installs the npm package `bootstrap` in its directory.

## Fix Attempt #2

Include the full version of Handlebars so that it is possible to compile templates on the fly as suggested [here](https://github.com/stefanpenner/ember-cli/issues/972)

Add the following to `Brocfile.js`

```javascript
var app = new EmberApp({
    vendorFiles: {
        'handlebars.js': {
            production:  'bower_components/handlebars/handlebars.js'
        }
    }
});
```

Success. This works for now but its not a great fix as we should only need the Handlebars runtime. It would be best to figure out the issue with `ember-cli-boostrap` and fix it there.

## Issue #2 ember-cli-simple-auth

```bash
npm install --save-dev ember-cli-simple-auth@0.6.6 # version for ember-cli 0.0.44
ember generate ember-cli-simple-auth
npm install --save-dev ember-cli-simple-auth-devise@0.6.6
```

```
Uncaught Error: Could not find module simple-auth-devise/configuration
```

## Fix Attempt #3

So `ember serve --environment=production` doesn't yield the issue, only when deploying to Heroku.

Looking at the source code for simple-auth-devise, [0.6.7](https://github.com/simplabs/ember-cli-simple-auth-devise/commit/d135e3e7e4ba697ecddc316360658638c0eab3fa) switched to using `simple-auth-devise/configuration` instead of `simple-auth-devise/initializer` which implies that the Heroku build isn't using 0.6.6 as expected, which we can see here

```bash
-----> Installing dependencies       
       ember-cli-simple-auth@0.6.7 node_modules/ember-cli-simple-auth
-----> Installing dependencies
       ember-cli-simple-auth-devise@0.6.7 node_modules/ember-cli-simple-auth-devise
```

Switching `package.json` from

```json
    "ember-cli-simple-auth": "^0.6.6",
    "ember-cli-simple-auth-devise": "^0.6.6",
```

to

```json
    "ember-cli-simple-auth": "0.6.6",
    "ember-cli-simple-auth-devise": "0.6.6",
```

fixes the problem.

Success.

## Pending Things to Try

<http://stackoverflow.com/questions/24067394/ember-cli-cannot-find-module-broccoli-static-compilererror-cannot-find-modul>

## NPM

``` bash
# view components
npm view ember-cli-boostrap
# install particular version
npm install --save-dev ember-cli-bootstrap@0.0.10

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

