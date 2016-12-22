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
    })
    .state({
      name:'commute',
      url:'/commute',
      templateUrl: 'views/commute.template.html',
      controller: 'CommuteController',
      controllerAs: 'commute'
    });



  }

}());
