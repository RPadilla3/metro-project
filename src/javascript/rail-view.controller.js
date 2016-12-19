(function() {
    'use strict';

    angular.module('transport')
        .controller('RailViewController', RailViewController);

    RailViewController.$inject = ['RailViewService'];

    function RailViewController(RailViewService) {

        this.railInfo = RailViewService.railInfo()
            .then(function success(data) {
                console.log('success', data);
            })
            .catch(function failure(xhr) {
                console.log('failed', xhr);
            });

    }


}());