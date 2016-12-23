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

    this.railInfo = function railInfo(){
      RailViewService.railInfo()
      .then(function success(data) {
        var data = data;
        vm.railIncident = data.data.Incidents;

        console.log('Rail Incidents', data.data.Incidents);
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
        vm.incidents = data.data.ElevatorIncidents;
        console.log('Station Incidents', data.data);
      })
      .catch(function failure(xhr) {
        console.log('Failed', xhr);
      });

    }



  }


}());
