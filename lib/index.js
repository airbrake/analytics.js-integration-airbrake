
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * UMD ?
 */

var umd = typeof window.define === 'function' && window.define.amd;

/**
 * Source.
 */

var src = '//cdnjs.cloudflare.com/ajax/libs/airbrake-js/0.5.8/client.min.js';

/**
 * Expose `Airbrake` integration.
 */

var Airbrake = module.exports = integration('Airbrake')
  .global('Airbrake')
  .option('projectId', '')
  .option('projectKey', '')
  .tag('<script src="' + src + '">');

/**
 * Initialize.
 *
 * @api public
 */

Airbrake.prototype.initialize = function() {
  var self = this;

  if (umd) {
    window.require([src], function(airbrake) {
      airbrake.projectKey = self.options.projectKey;
      airbrake.projectId = self.options.projectId;
      window.Airbrake = airbrake;
      self.ready();
    });
    return;
  }

  this.load(function() {
    window.Airbrake.projectKey = self.options.projectKey;
    window.Airbrake.projectId = self.options.projectId;
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Airbrake.prototype.loaded = function() {
  return is.object(window.Airbrake);
};
