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
      templateUrl: 'views/home.template.html',
      controller: 'RailViewController',
      controllerAs: 'railView'
    })
    .state({
      name: 'metro',
      url: '/metro',
      templateUrl: 'views/metro.template.html',
      controller: 'RailViewController',
      controllerAs: 'railView'
    });

  }

}());
