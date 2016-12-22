(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService'];

  /**
  * [RailViewController description]
  * @param {[type]} RailViewService [description]
  */
  function RailViewController(RailViewService) {

    var vm = this;
    this.incident = [];
    this.railIncident = [];

    this.railInfo = function railInfo(){
      RailViewService.railInfo()
      .then(function success(data) {
        vm.railIncident = data;
        console.log('Rail Incidents', data);
      })
      .catch(function failure(xhr) {
        console.log('No data for you :(', xhr);
      });

    };

    this.railPark = function railPark() {
      RailViewService.railParking()
      .then(function success(data) {
        console.log('Rail Parking', data);
      })
      .catch(function failed(xhr) {
        console.log('No data for you :(', xhr);
      });
    };


    this.getIncidents = function getIncidents() {
      RailViewService.stationIncidents()
      .then(function success(data) {
        vm.incidents = data;
        console.log('Station Incidents', data);
      })
      .catch(function failure(xhr) {
        console.log('Failed', xhr);
      });

    }

  }


}());
