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
