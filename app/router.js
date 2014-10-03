import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberDeployTestENV.locationType
});

Router.map(function() {
});

export default Router;
