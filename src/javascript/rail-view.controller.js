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
    console.log('initializing RailView');

    this.railInfo = function railInfo(){
      RailViewService.railInfo()
      .then(function success(data) {
        console.log('Rail Incidents', data);
      })
      .catch(function failure(xhr) {
        console.log('No data for you :(', xhr);
      });

      RailViewService.stationIncidents()
      .then(function success(data) {
        console.log('Station Incidents', data);
      })
      .catch(function failure(xhr) {
        console.log('try again tomorrow buddy', xhr);
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

  }


}());
