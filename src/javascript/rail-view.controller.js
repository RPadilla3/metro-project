(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService', 'MapDetailService'];

  /**
  * [RailViewController description]
  * @param {[type]} RailViewService [description]
  */
  function RailViewController(RailViewService) {

    var vm = this;
    this.incidents = [];
    this.railIncident = [];
    this.railParking = [];
    this.distance = {};
    this.position = [];
    this.stationNames = {};

    // Red line,
    // silver line,
    // orange line,
    // blue line,
    // yellow line,
    // green line

    this.metroLineCodes = {
      'Shady Grove':'A15',
      'Rockville':'A14',
      'Twinbrook':'A13',
      'White Flint':'A12',
      'Grosvenor Strathmore':'A11',
      'Medical Center':'A10',
      'Bethesda':'A09',
      'Friendship Heights':'A08',
      'Tenleytown':'A07',
      'Van Ness UDC':'A06',
      'Cleveland Park':'A05',
      'Woodley Park':'A04',
      'Dupont Circle':'A03',
      'Farragut North':'A02',
      'Metro Center':'A01',
      'Gallery Place China Town':'B01',
      'Judiciary Square':'B02',
      'Union Station':'B03',
      'Noma':'B35',
      'Rhode Island Avenue':'B04',
      'Brookland':'B05',
      'Fort Totten':'B06',
      'Takoma':'B07',
      'Silver Spring':'B08',
      'Forest Glen':'B09',
      'Wheaton':'B10',
      'Glenmont':'B11',
      'Vienna':'K08',
      'Dunn Loring':'K07',
      'West Falls Church':'K06',
      'East Falls Church':'K05',
      'Ballston-MU':'K04',
      'Virginia Square-GMU':'K03',
      'Clarendon':'K02',
      'Court House':'K01',
      'Rossylyn':'C05',
      'Foggy Bottom-GWU':'C04',
      'Farragut West':'C03',
      'McPherson Square':'C02',
      'Metro Center':'C01',
      'Federal Triangle':'D01',
      'Smithsonian':'D02',
      'L\'enfant Plaza':'D03',
      'Federal Center SW':'D04',
      'Capitol South':'D05',
      'Eastern Market':'D06',
      'Potomac Avenue':'D07',
      'Stadium-Armory':'D08',
      'Minnesota Avenue':'D09',
      'Deanwood':'D10',
      'Cheverly':'D11',
      'Landover':'D12',
      'New Carrollton':'D13',
      'Wiehle-Reston East':'N06',
      'Spring Hill':'N04',
      'Greensboro':'N03',
      'Tysons Corner':'N02',
      'Mclean':'N01',
      'East Falls Church':'K05',
      'Ballston-MU':'K04',
      'Virginia Square-GMU':'K03',
      'Clarendon':'K02',
      'Courthouse':'K01',
      'Benning Road':'G01',
      'Capitol Heights':'G02',
      'Addison Road':'G03',
      'Morgan Boulevard':'G04',
      'Largo Town Center':'G05',
      'Franconia-Springfield':'J03',
      'Van Dorn Street':'J02',
      'King Street-Old Town':'C13',
      'Braddock Road':'C12',
      'Potomac Yard':'C11',
      'Ronald Reagan Washington National Airport':'C10',
      'Crystal City':'C09',
      'Pentagon City':'C08',
      'Pentagon':'C07',
      'Arlington Cemetery':'C06',
      'Huntington':'C15',
      'Eisenhower Ave':'C14',
      'Archives-Navy Memorial - Penn Quarter':'F02',
      'Mount Vernon Square':'E01',
      'Shaw-Howard University':'E02',
      'U Street/African-American Civil War Memorial':'E03',
      'Columbia Heights':'E04',
      'Georgia Avenue-Petworth':'E05',
      'West Hyatsville':'E07',
      'Prince George\'s Plaza':'E08',
      'College Park - University of Maryland':'E09',
      'Greenbelt':'E10',
      'Branch Avenue':'F11',
      'Suitland':'F10',
      'Naylor Road':'F09',
      'Southern Avenue':'F08',
      'Congress Heights':'F07',
      'Anacostia':'F06',
      'Navy Yard - Ballpark':'F05',
      'Waterfront':'F04'
    };

    var metroLineCodes = vm.metroLineCodes;
    console.log(metroLineCodes);
    console.log(Object.keys(metroLineCodes));
    console.log(Object.values(metroLineCodes));

    this.railInfo = function railInfo(){
      RailViewService.railInfo()
      .then(function success(data) {
        vm.railIncident = data.data.Incidents;
        console.log('success', data.data.Incidents);
      })
      .catch(function failure(xhr) {
        console.error('No data for you :(', xhr);
      });

    };

    this.railPark = function railPark() {
      RailViewService.railParking()
      .then(function success(data) {
        vm.railParking = data.data.StationsParking;
        console.log('Rail Parking', data.data);
      })
      .catch(function failed(xhr) {
        console.error('No data for you :(', xhr);
      });
    };


    this.getIncidents = function getIncidents() {
      RailViewService.stationIncidents()
      .then(function success(data) {
        vm.incidents = data.data.ElevatorIncidents;
        console.log('You got it!', data.data.ElevatorIncidents);
      })
      .catch(function failure(xhr) {
        console.log('Failed', xhr);
      });

    };

    this.getStationToStation = function getStationToStation() {
      vm.distance.start = metroLineCodes[vm.stationNames.start];
      vm.distance.end = metroLineCodes[vm.stationNames.end];
      RailViewService.stationDistance(vm.distance)
      .then(function success(data) {
        vm.stationToStationInfo = data.data.StationToStationInfos[0];
        console.log('Miles to Destination', vm.stationToStationInfo);
      })
      .catch(function failed(xhr) {
        console.log(xhr);
      });
    };

    this.getStationPositions = function getStationPositions() {
      RailViewService.stationPositions()
      .then(function successful(data) {
        vm.position = data.data;
        console.log('Red line positions', data.data);
      })
      .catch(function failure(xhr) {
        console.log(xhr);
      });
    };



  }


}());
