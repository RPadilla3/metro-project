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
