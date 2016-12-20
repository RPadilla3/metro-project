(function() {
  'use strict';

  angular.module('transport', []);
  // .config(viewConfig);
  //
  // viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  //
  // function viewConfig($stateProvider, $urlRouterProvider) {
  //   $urlRouterProvider.when('', '/');
  //
  //   $stateProvider
  //   .state({
  //     name: 'home',
  //     url: '/',
  //     templateUrl: 'src/views/home.template.html'
  //   });
  //
  //
  // }

}());

(function() {
  'use strict';

    function initMap() {
      var map;
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.1199273249, lng: -77.1646273343},
        zoom: 10
      });
        return initMap();
    }

}());

(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService'];

  function RailViewController(RailViewService) {

    this.railInfo = RailViewService.railInfo()
      .then(function success(data) {
      console.log('Rail Info', data);
      })
      .catch(function failure(xhr) {
      console.log('No data for you :(', xhr);
      });

    this.railPark = RailViewService.railParking()
      .then(function success(data) {
      console.log('Rail Parking', data);
      })
      .catch(function failed(xhr) {
      console.log('No data for you :(', xhr);
      });

  }


}());

(function() {
  'use strict';

  angular.module('transport')
    .factory('RailViewService', RailViewService);

  RailViewService.$inject = ['$http'];

  function RailViewService($http) {
    return {
      railInfo: railInfo,
      railParking: railParking
    };

    function railInfo() {
      return $http({
        url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/B03',
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'api_key': 'f44ffd8ba84f459796d5a0870957bdb7'
        }
      });
    }

    function railParking() {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jStationParking?StationCode=E08',
        method:'get',
        headers: {
          'content-type': 'application/json',
          'api_key': 'f44ffd8ba84f459796d5a0870957bdb7'
        }
      });
    }
  }

}());
