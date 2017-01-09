(function() {
  'use strict';

  var expect = chai.expect;

  describe('Getting Metro Delays', function() {

    var RailViewService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('transport'));

    beforeEach(inject(function(_$httpBackend_,_RailViewService_) {
      $httpBackend = _$httpBackend_;
      RailViewService = _RailViewService_;
    }));

    $httpBackend
    .whenGet('https://api.wmata.com/Incidents.svc/json/Incidents')
    .respond({
      "Incidents": [
        {
          "IncidentID": "01C30D6E-8E5E-4B06-9D47-2E277530DE5F",
          "Description": "Red Line: Expect residual delays to Shady Grove due to an earlier signal problem at Farragut North.",
          "StartLocationFullName": null,
          "EndLocationFullName": null,
          "PassengerDelay": 0,
          "DelaySeverity": null,
          "IncidentType": "Delay",
          "EmergencyText": null,
          "LinesAffected": "RD;",
          "DateUpdated": "2017-01-09T10:58:29"
        }
      ]
    });



    $httpBackend.flush();

    });

  }());
