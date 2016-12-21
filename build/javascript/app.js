(function() {
  'use strict';

  angular.module('transport', ['ui.router'])
  .config(viewConfig);

  viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function viewConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
    .state({
      name: 'home',
      url: '',
      templateUrl: '../views/home.template.html'
    })
    .state({
      name: 'metro',
      url: '/metro',
      templateUrl: '../views/metro.template.html'
    })
    .state({
      name: 'login',
      url: '/login',
      templateUrl: '../views/login.template.html'
    });


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
