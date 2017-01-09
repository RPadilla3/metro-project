(function() {
  'use strict';

  var expect = chai.expect;

  describe('Getting Metro Delays', function() {

    var RailViewService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('transport'));

    beforeEach(inject(function(_$httpBackend_,_RailViewService_,_$rootScope_) {
      $httpBackend = _$httpBackend_;
      RailViewService = _RailViewService_;
      $rootScope = _$rootScope_;


      $httpBackend
      .whenGET('https://api.wmata.com/Incidents.svc/json/Incidents')
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
          },
          {
            "IncidentID": "16F9EDC0-A695-4940-AE0C-0FD186466BEA",
            "Description": "Silver Line trains operating btwn Wiehle-Reston E & Ballston only due to scheduled track work. Use Orange/Blue Lines to/from other stations.",
            "StartLocationFullName": null,
            "EndLocationFullName": null,
            "PassengerDelay": 0,
            "DelaySeverity": null,
            "IncidentType": "Alert",
            "EmergencyText": null,
            "LinesAffected": "SV;",
            "DateUpdated": "2017-01-09T10:18:47"
          }
        ]
      });

      $httpBackend
      .whenGET('views/home.template.html')
      .respond('what yo');

    }));

    it('should be able to GET a list of metro delays', function(done) {
      var result = RailViewService.railInfo();
      expect(result).to.be.a('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
        .then(function(data) {
          expect(data.data.Incidents[0].Description).to.equal("Red Line: Expect residual delays to Shady Grove due to an earlier signal problem at Farragut North.");
          expect(data.data.Incidents[0].LinesAffected).to.equal("RD;");
          expect(data.data.Incidents[0].IncidentID).to.equal("01C30D6E-8E5E-4B06-9D47-2E277530DE5F");
          expect(data.data.Incidents[0].IncidentType).to.equal("Delay");
          expect(data.data.Incidents[1].LinesAffected).to.equal("SV;");
          done();
        })
        .catch(function() {
          done('In the catch');
        })

      $httpBackend.flush();
    });





  });

}());
