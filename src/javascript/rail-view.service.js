(function() {
  'use strict';

  angular.module('transport')
    .factory('RailViewService', RailViewService);

  RailViewService.$inject = ['$http'];

  /**
   * RailViewService Constructor Function that returns all the rail related http calls
   * @param {Angular} $http Dependency Injection
   * @return {void}
   */
  function RailViewService($http) {

    var passKey = 'f44ffd8ba84f459796d5a0870957bdb7';

    return {
      railInfo: railInfo,
      railParking: railParking,
      stationIncidents: stationIncidents,
      stationDistance: stationDistance,
      trainPositions: trainPositions
    };

    function railInfo() {
      return $http({
        url: 'https://api.wmata.com/Incidents.svc/json/Incidents',
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'api_key': passKey
        }
      });
    }

    function railParking() {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jStationParking',
        method:'get',
        headers: {
          'content-type': 'application/json',
          'api_key': passKey
        }
      });
    }

    function stationIncidents() {
      return $http({
        url: 'https://api.wmata.com/Incidents.svc/json/ElevatorIncidents',
        method: 'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

    function stationDistance(distance) {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo',
        method: 'get',
        params: {
          FromStationCode: distance.start,
          ToStationCode: distance.end
        },
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

    function trainPositions(stationCode){
      console.log(stationCode);
      return $http({
        url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + stationCode,
        method:'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

  }

}());
