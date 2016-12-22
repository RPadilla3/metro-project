(function() {
  'use strict';

  var expect = chai.expect;

  describe('Rail-View Controller', function() {
    var RailViewController;
    var mockRailViewService = {};

    beforeEach(module('transport'));
    beforeEach(inject(function($controller) {
      RailViewController = $controller('RailViewController');
    }))

    it('Should contain scope variables', function() {
      expect(RailViewController).to.be.an('Object');
    })
  });

}());
