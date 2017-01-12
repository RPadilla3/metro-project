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

    /**
     * http request that returns metro delay information across all stations
     * @return {Promise}
     */
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

    /**
     * http request that returns station parking information across stations
     * @return {Promise}
     */
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

    /**
     * http request that returns elevator/escalator incidents across all stations
     * @return {Promise}
     */
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

    /**
     * http request that returns the distance in miles and minutes as well as price from the stations a user inputs
     * @param  {string} distance [String modeled into the stationNames object as stationNames.start and stationNames.end]
     * @return {Promise}
     */
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

    /**
     * http request that returns all incoming trains to the station a user inputs.
     * @param  {String} stationCode [Information the user types in that gets modeled into liveTrains.code]
     * @return {Promise}          
     */
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
