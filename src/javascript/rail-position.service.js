(function() {
  'use strict';

  angular.module('transport')
    .factory('RailPositionService', RailPositionService);

  RailPositionService.$inject = ['$http'];

  /**
   * [RailPositionService description]
   * @param {[type]} $http [description]
   */
  function RailPositionService($http) {

    var passKey = 'f44ffd8ba84f459796d5a0870957bdb7';

    return {
      liveTrainPositions: liveTrainPositions
    };

    function liveTrainPositions() {
      return $http({
        url: 'https://api.wmata.com/TrainPositions/TrainPositions?contentType=json',
        method: 'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }
  }

}());
