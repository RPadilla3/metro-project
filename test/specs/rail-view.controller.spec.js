(function() {
  'use strict';

  var expect = chai.expect;

  describe('RailViewController', function() {
    var RailViewController;
    var $scope = {};
    var $rootScope;
    var mockRailViewService = {};


  beforeEach(module('transport'));

  beforeEach(module(function($provide){
    $provide.value('RailViewService', mockRailViewService);

  }));

  beforeEach(inject(function($controller, $q,_$rootScope_) {
    $rootScope = _$rootScope_;
    mockRailViewService.railInfo = function() {
      console.log('Mock railInfo() on RailViewService');
      return $q.resolve({
        "Incidents": [
          {
            "Description": "Red Line: Expect residual delays to Shady Grove due to an earlier signal problem at Farragut North.",
            "PassengerDelay": 0,
            "IncidentType": "Delay",
            "LinesAffected": "RD;"
          }
        ]
      });
    };
    RailViewController = $controller('RailViewController', {$scope: $scope});
  }));

  it('Should have correct scope variable', function() {
    expect(RailViewController.liveTrainLocation).to.be.a('object');
    expect(RailViewController.incidents).to.be.an('array');
    expect(RailViewController.railIncident).to.be.an('array');
    expect(RailViewController.railParking).to.be.an('array');
    expect(RailViewController.distance).to.be.a('object');
    expect(RailViewController.position).to.be.an('array');
    expect(RailViewController.trainPosition).to.be.an('array');
    expect(RailViewController.stationNames).to.be.a('object');
    expect(RailViewController.metroLineCodes).to.be.a('object');
    expect(RailViewController.metroLineCodes.Rockville).to.equal('A14');
  });

});

}());
