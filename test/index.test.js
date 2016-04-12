
var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Airbrake = require('../lib/');

describe('Airbrake', function() {
  var analytics;
  var airbrake;
  var options = {
    projectKey: '96979331ec7e18bbe7ec1529da2ed083',
    projectId: '122374'
  };
  var onError = window.onerror;

  beforeEach(function() {
    analytics = new Analytics();
    airbrake = new Airbrake(options);
    analytics.use(Airbrake);
    analytics.use(tester);
    analytics.add(airbrake);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    airbrake.reset();
    sandbox();
  });

  it('should have the right settings', function() {
    analytics.compare(Airbrake, integration('Airbrake')
      .global('Airbrake')
      .option('projectId', '')
      .option('projectKey', ''));
  });

  describe('before loading', function() {
    beforeEach(function() {
      analytics.stub(airbrake, 'load');
    });
  });

  describe('loading', function() {
    it('should load and set an onerror handler', function(done) {
      analytics.load(airbrake, function(err) {
        if (err) return done(err);
        analytics.assert(window.onerror !== onError);
        analytics.assert(typeof window.onerror === 'function');
        done();
      });
    });
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });
  });
});
