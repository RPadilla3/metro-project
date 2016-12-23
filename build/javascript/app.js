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
      name: 'login',
      url: '/login',
      templateUrl: 'views/login.template.html'
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
        var map = L.mapbox.map('map')
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
                html: '<div style="text-align:center;color:#fff;background:' +
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
      stationIncidents: stationIncidents

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
        url:'https://api.wmata.com/Rail.svc/json/jStationParking?StationCode=E08',
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

  }

}());
