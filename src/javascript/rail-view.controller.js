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

    // Red line,
    // silver line,
    // orange line,
    // blue line,
    // yellow line,
    // green line

    this.metroLineCodes = {
      'A15':'Shady Grove',
      'A14':'Rockville',
      'A13':'Twinbrook',
      'A12':'White Flint',
      'A11':'Grosvenor Strathmore',
      'A10':'Medical Center',
      'A09':'Bethesda',
      'A08':'Friendship Heights',
      'A07':'Tenleytown',
      'A06':'Van Ness UDC',
      'A05':'Cleveland Park',
      'A04':'Woodley Park',
      'A03':'Dupont Circle',
      'A02':'Farragut North',
      'A01':'Metro Center',
      'B01':'Gallery Place China Town',
      'B02':'Judiciary Square',
      'B03':'Union Station',
      'B35':'Noma',
      'B04':'Rhode Island Avenue',
      'B05':'Brookland',
      'B06':'Fort Totten',
      'B07':'Takoma',
      'B08':'Silver Spring',
      'B09':'Forest Glen',
      'B10':'Wheaton',
      'B11':'Glenmont',
      'K08':'Vienna',
      'K07':'Dunn Loring',
      'K06':'West Falls Church',
      'K05':'East Falls Church',
      'K04':'Ballston-MU',
      'K03':'Virginia Square-GMU',
      'K02':'Clarendon',
      'K01':'Court House',
      'C05':'Rossylyn',
      'C04':'Foggy Bottom-GWU',
      'C03':'Farragut West',
      'C02':'McPherson Square',
      'C01':'Metro Center',
      'D01':'Federal Triangle',
      'D02':'Smithsonian',
      'D03':'L\'enfant Plaza',
      'D04':'Federal Center SW',
      'D05':'Capitol South',
      'D06':'Eastern Market',
      'D07':'Potomac Avenue',
      'D08':'Stadium-Armory',
      'D09':'Minnesota Avenue',
      'D10':'Deanwood',
      'D11':'Cheverly',
      'D12':'Landover',
      'D13':'New Carrollton',
      'N06':'Wiehle-Reston East',
      'N04':'Spring Hill',
      'N03':'Greensboro',
      'N02':'Tysons Corner',
      'N01':'Mclean',
      'K05':'East Falls Church',
      'K04':'Ballston-MU',
      'K03':'Virginia Square-GMU',
      'K02':'Clarendon',
      'K01':'Courthouse',
      'G01':'Benning Road',
      'G02':'Capitol Heights',
      'G03':'Addison Road',
      'G04':'Morgan Boulevard',
      'G05':'Largo Town Center',
      'J03':'Franconia-Springfield',
      'J02':'Van Dorn Street',
      'C13':'King Street-Old Town',
      'C12':'Braddock Road',
      'C11':'Potomac Yard',
      'C10':'Ronald Reagan Washington National Airport',
      'C09':'Crystal City',
      'C08':'Pentagon City',
      'C07':'Pentagon',
      'C06':'Arlington Cemetery',
      'C15':'Huntington',
      'C14':'Eisenhower Ave',
      'F02':'Archives-Navy Memorial - Penn Quarter',
      'E01':'Mount Vernon Square',
      'E02':'Shaw-Howard University',
      'E03':'U Street/African-American Civil War Memorial',
      'E04':'Columbia Heights',
      'E05':'Georgia Avenue-Petworth',
      'E07':'West Hyatsville',
      'E08':'Prince George\'s Plaza',
      'E09':'College Park - University of Maryland',
      'E10':'Greenbelt',
      'F11':'Branch Avenue',
      'F10':'Suitland',
      'F09':'Naylor Road',
      'F08':'Southern Avenue',
      'F07':'Congress Heights',
      'F06':'Anacostia',
      'F05':'Navy Yard - Ballpark',
      'F04':'Waterfront'
    };

    var metroLineCodes = vm.metroLineCodes;
    console.log(metroLineCodes);

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
