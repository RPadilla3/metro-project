(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService', 'MapDetailService'];

  /**
  * [RailViewController description]
  * @param {[type]} RailViewService [description]
  */
  function RailViewController(RailViewService, MapDetailService) {

    var vm = this;
    this.incidents = [];
    this.railIncident = [];
    this.railParking = [];
    this.distance = {};
    this.stationToStationInfo;
    this.position = [];
    vm.message = undefined;

    this.redlineCodes = {
      'A15':'shadygrove',
      'A14':'rockville',
      'A13':'twinbrook',
      'A12':'whiteflint',
      'A11':'grosvenorstrathmore',
      'A10':'medicalcenter',
      'A09':'bethesda',
      'A08':'friendshipheights',
      'A07':'tenleytown',
      'A06':'vannessudc',
      'A05':'clevelandpark',
      'A04':'woodleypark',
      'A03':'dupontcircle',
      'A02':'farragutnorth',
      'A01':'metrocenter',
      'B01':'galleryplace',
      'B02':'judiciarysquare',
      'B03':'unionstation',
      'B35':'noma',
      'B04':'rhodeislandavenue',
      'B05':'brookland',
      'B06':'forttotten',
      'B07':'takoma',
      'B08':'silverspring',
      'B09':'forestglen',
      'B10':'wheaton',
      'B11':'glenmont'
    };

    var redlineCodes = redlineCodes;
      console.log(this.redlineCodes);

    this.railInfo = function railInfo(){
      RailViewService.railInfo()
      .then(function success(data) {
        var data = data;
        vm.railIncident = data.data.Incidents;
        console.log('success', data.data.Incidents);
      })
      .catch(function failure(xhr) {
        console.error('No data for you :(', xhr);
      });

    };

    this.railPark = function railPark() {
      RailViewService.railParking()
      .then(function success(data) {
        vm.railParking = data.data.StationsParking;
        console.log('Rail Parking', data.data);
      })
      .catch(function failed(xhr) {
        console.error('No data for you :(', xhr);
      });
    };


    this.getIncidents = function getIncidents() {
      RailViewService.stationIncidents()
      .then(function success(data) {
        vm.incidents = data.data.ElevatorIncidents;
        console.log('You got it!', data.data.ElevatorIncidents);
      })
      .catch(function failure(xhr) {
        console.log('Failed', xhr);
      });

    };

    this.getStationToStation = function getStationToStation() {
      RailViewService.stationDistance(vm.distance)
      .then(function success(data) {
        vm.stationToStationInfo = data.data.StationToStationInfos[0];
        console.log('Miles to Destination', data.data);
      })
      .catch(function failed(xhr) {
        console.log(xhr);
      });
    };

    this.positions = function positions() {
      RailViewService.stationPositions()
      .then(function successful(data) {
        vm.position = data.data;
        console.log('Red line positions', data.data);
      })
      .catch(function failure(xhr) {
        console.log(xhr);
      });
    };



  }


}());
