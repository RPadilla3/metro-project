(function() {
 'use strict';

 angular.module('transport')
   .directive('mapbox', MapBox);


   function MapBox() {
     return {
       restrict: 'EA',
       link: function (scope, element) {
         L.mapbox.accessToken = 'pk.eyJ1IjoicnBhZGlsbGEzIiwiYSI6ImNpd3hrZjF4MTAwN20ydW82ODNyOHp3Z2UifQ.ATqkcRlunPfsvsS5SGFM6Q';
         L.mapbox.map(element[0], 'mapbox.streets')
           .setView([38.9072, -77.0369], 13.2);
       }
     };
   }

}());
