(function() {
  'use strict';

  angular.module('transport', ['ui.router'])
  .config(viewConfig);

  viewConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function viewConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.when('', '/');
    $locationProvider.hashPrefix('');


    $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'views/home.template.html'
    })
    .state({
      name: 'metro',
      url: '/metro',
      templateUrl: 'views/metro.template.html',
      controller: 'RailViewController',
      controllerAs: 'railView'
    })
    .state({
      name:'positions',
      url:'/positions',
      templateUrl: 'views/rail-position.template.html',
      controller: 'RailPositionController',
      controllerAs: 'position'
    });

  }

}());

(function() {
  'use strict';

  angular.module('transport')
    .factory('MapDetailService', MapDetailService);

  MapDetailService.$inject = ['$http'];

  function MapDetailService($http) {

    return {
      getStations: getStations
    };

  function getStations(){

    var metroData;

    return $http({
      url: 'http://opendata.dc.gov/datasets/ab5661e1a4d74a338ee51cd9533ac787_50.geojson',
      method: 'get'
    })
    .then(function returnedData(data) {
      metroData = data.data;
      console.log('Metro station lat,lon', metroData);

      return data.data

    })
  }
}


}());

 (function() {
  'use strict';

  angular.module('transport')
  .directive('mapbox', MapBox);


  function MapBox() {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        var map = L.mapbox.map('map');
        L.mapbox.accessToken = 'pk.eyJ1IjoicnBhZGlsbGEzIiwiYSI6ImNpd3hrZjF4MTAwN20ydW82ODNyOHp3Z2UifQ.ATqkcRlunPfsvsS5SGFM6Q';
        L.mapbox.map(element[0], 'mapbox.streets')
        .setView([38.9072, -77.0369], 13.2)
        .addLayer(L.mapbox.tileLayer('mapbox.streets'));
        L.mapbox.featureLayer()
        .loadURL('views/metro-stations.geojson')
        .on('ready', function(e) {          function makeGroup(color) {
          return new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
              return new L.DivIcon({
                iconSize: [20, 20],
                html: '<div style="text-align:center;color:#ffffff;background:' +
                color + '">' + cluster.getChildCount() + '</div>'
              });
            }
          }).addTo(map);
        } var groups = {
              red:    makeGroup('red'),
              green:  makeGroup('green'),
              orange: makeGroup('orange'),
              blue:   makeGroup('blue'),
              yellow: makeGroup('yellow')
          };
        e.target.eachLayer(function(layer) {
          groups[layer.feature.properties.line].addLayer(layer);
        });
      });
    }
  };
}

}());

(function() {
  'use strict';

  angular.module('transport')
    .controller('RailPositionController', RailPositionController);

  RailPositionController.$inject = ['RailPositionService'];

  function RailPositionController(RailPositionService) {

    this.railPos = function railPos() {
      RailPositionService.liveTrainPositions()
      .then(function yes(data) {
        console.log('live Train Positions', data);
      })
      .catch(function failed(xhr) {
        console.log('no live trains for you :(', xhr);
      });
    };

  }


}());

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
    this.distances = [];
    this.position = [];
    this.stationNames = {};

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
        console.log('No data for you :(', xhr);
      });

    };

    this.railPark = function railPark() {
      RailViewService.railParking()
      .then(function success(data) {
        vm.railParking = data.data.StationsParking;
        console.log('Rail Parking', data.data);
      })
      .catch(function failed(xhr) {
        console.log('No data for you :(', xhr);
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

    }

    this.distance = function distance() {
      RailViewService.stationDistance()
      .then(function success(data) {
        vm.distances = data.data;
        console.log('Miles to Destination', data.data);
      })
      .catch(function failed(xhr) {
        console.log(xhr);
      });
    }

    this.positions = function positions() {
      RailViewService.stationPositions()
      .then(function aye(data) {
        vm.position = data.data;
        console.log('Red line positions', data.data);
      })
      .catch(function nah(xhr) {
        console.log(xhr);
      })
    }



  }


}());

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
      stationPositions: stationPositions
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

    function stationDistance(stationNames) {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?FromStationCode='
        + stationNames + '&ToStationCode=' + stationNames,
        method: 'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

    function stationPositions() {
      return $http({
        url: 'https://api.wmata.com/Rail.svc/json/jStations?LineCode=RD',
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'api_key': passKey
        }
      });
    }

  }

}());
