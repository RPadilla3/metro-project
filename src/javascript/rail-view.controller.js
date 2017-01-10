(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService','MetroLineService'];

  /**
  * [RailViewController description]
  * @param {[type]} RailViewService [description]
  */
  function RailViewController(RailViewService,MetroLineService) {

    var vm = this;
    this.delayFailureMessage = false;
    this.delayMessage = true;
    this.parkingErrorMessage = false;
    this.stationIncidentErrorMessage = false;
    this.toggleCommuteInfo = false;
    this.toggleClose = true;
    this.stationToStationError = false;
    this.trainPositionError = false;
    this.trainPosition = [];
    this.liveTrainLocation = {};
    this.incidents = [];
    this.railIncident = [];
    this.railParking = [];
    this.distance = {};
    this.liveTrains = {};
    this.position = [];
    this.stationNames = {};
    this.liveTrainsCode = {};

    this.toggleMetroInfo = function toggleMetroInfo() {
      vm.toggleClose = true;
    };

    this.toggleDelayInfo = function toggleDelayInfo() {
      vm.delayMessage = true;
    };

    this.railInfo = function railInfo(){

      RailViewService.railInfo()
      .then(function success(data) {
        vm.railIncident = data.data.Incidents;
        if(vm.railIncident.length === 0) {
          vm.noDelayMessage = 'No current Metro Delays.';
        }
        vm.delayMessage = false;
        console.log(vm.railIncident.length);
        // vm.toggleDelayInfo = true;
        console.log('the array', vm.railIncident);
      })
      .catch(function failure(xhr) {
        vm.delayFailureMessage = 'Failed to communicate to WMATA server: Please try again later.';
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
        vm.parkingErrorMessage = 'Failed to communicate to WMATA server: Please try again later.';
        console.error('No data for you :(', xhr);
      });
    };

    this.getIncidents = function getIncidents() {
      RailViewService.stationIncidents()
      .then(function success(data) {
        vm.incidents = data.data.ElevatorIncidents;
        vm.toggleClose = false;
        console.log('You got it!', data.data.ElevatorIncidents);
      })
      .catch(function failure(xhr) {
        vm.stationIncidentErrorMessage = 'Failed to communicate to WMATA server: Please try again later.';
        console.log('Failed', xhr);
      });

    };

    this.getStationToStation = function getStationToStation() {
      vm.distance.start = MetroLineService.metroStationToCode(vm.stationNames.start);
      vm.distance.end = MetroLineService.metroStationToCode(vm.stationNames.end);
      // vm.distance.start = metroLineCodes[vm.stationNames.start];
      // vm.distance.end = metroLineCodes[vm.stationNames.end];
      RailViewService.stationDistance(vm.distance)
      .then(function success(data) {
        vm.stationToStationInfo = data.data.StationToStationInfos[0];
        vm.toggleCommuteInfo = true;
        console.log('Miles to Destination', vm.stationToStationInfo);
      })
      .catch(function failed(xhr) {
        vm.stationToStationError = 'Failed to communicate to WMATA server: Please try again later.';
        console.log(xhr);
      });
    };

    this.getStationPositions = function getStationPositions() {
      RailViewService.stationPositions()
      .then(function successful(data) {
        vm.position = data.data;
        console.log('Red line positions', data.data);
      })
      .catch(function failure(xhr) {
        console.log(xhr);
      });
    };

    this.getTrainPositions = function getTrainPositions(){
      vm.liveTrainsCode.code = MetroLineService.liveTrainStationCode(vm.liveTrains.code);
      RailViewService.trainPositions(vm.liveTrainsCode.code)
      .then(function success(data) {
        vm.trainPosition = data.data.Trains;
        console.log('success', data);
      })
      .catch(function failed(xhr) {
        vm.trainPositionError = 'Failed to communicate to WMATA server: Please try again later.';
        console.log('failed', xhr);
      });
    };
  }

}());
