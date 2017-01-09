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
      .respond('Home Page');

    }));

    it('should be able to GET a list of metro delays', function(done) {
      var result = RailViewService.railInfo();
      expect(result).to.be.a('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
      .then(function(data) {
        expect(data.data.Incidents).to.be.an('array');
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

  describe('Getting Station Incidents', function() {

    var RailViewService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('transport'));

    beforeEach(inject(function(_$httpBackend_,_RailViewService_,_$rootScope_) {
      $httpBackend = _$httpBackend_;
      RailViewService = _RailViewService_;
      $rootScope = _$rootScope_;


      $httpBackend
      .whenGET('https://api.wmata.com/Incidents.svc/json/ElevatorIncidents')
      .respond({
        "ElevatorIncidents": [
          {
            "UnitName": "A01E05",
            "UnitType": "ESCALATOR",
            "UnitStatus": null,
            "StationCode": "A01",
            "StationName": "Metro Center, G and 11th St Entrance",
            "LocationDescription": "Escalator between mezzanine and platform to Glenmont",
            "SymptomCode": null,
            "TimeOutOfService": "0955",
            "SymptomDescription": "Service Call",
            "DisplayOrder": 0,
            "DateOutOfServ": "2017-01-09T09:55:00",
            "DateUpdated": "2017-01-09T09:56:40"
          }
        ]
      });

      $httpBackend
      .whenGET('views/home.template.html')
      .respond('Home Page');

    }));

    it('Should get All Metro Station Incidents', function(done) {
      var result = RailViewService.stationIncidents();
      expect(result).to.be.a('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
      .then(function(data) {
        console.log(data.data.ElevatorIncidents[0].UnitType);
        expect(data.data.ElevatorIncidents[0].UnitType).to.equal('ESCALATOR')
        done();
      })
      .catch(function() {
        done('In the catch');
      })

      $httpBackend.flush();
    });

  });


}());
