import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberHerokuENV.locationType
});

Router.map(function() {
});

export default Router;
