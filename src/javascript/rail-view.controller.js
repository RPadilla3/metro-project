(function() {
    'use strict';

    angular.module('transport')
        .controller('RailViewController', RailViewController);

    RailViewController.$inject = ['RailViewService'];

    function RailViewController(RailViewService) {

        this.railInfo = RailViewService.railInfo()
            .then(function success(data) {
                console.log('You got data!', data);
            })
            .catch(function failure(xhr) {
                console.log('No data for you :(', xhr);
            });

    }


}());
