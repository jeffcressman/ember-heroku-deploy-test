import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberHerokuDeployTestENV.locationType
});

Router.map(function() {
});

export default Router;
