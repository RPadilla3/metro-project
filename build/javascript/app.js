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

(function() {
  'use strict';

  angular.module('transport')
  .factory('MetroLineService', MetroLineService);


  /**
   * Factory Constructo Function that returns the functions into the controllers where injected.
   * @return {Functions}
   */
  function MetroLineService() {

    var vm = this;
    this.metroLineCodes = {
      'Shady Grove':'A15',
      'Shady grove': 'A15',
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
      'metro center':'A01',
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
      'Clarendon':'K02',
      'Court House':'K01',
      'Rosslyn':'C05',
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
      'Virginia Square-GMU':'K03',
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

    return {
      metroStationToCode: metroStationToCode,
      liveTrainStationCode: liveTrainStationCode
    };

    function metroStationToCode(stationName) {
      var filteredstationName = titleCase(stationName);
      return vm.metroLineCodes[filteredstationName];
    }

    function liveTrainStationCode(stationName){
      var filteredLiveTrain = titleCase(stationName);
      return vm.metroLineCodes[filteredLiveTrain];
    }

    function titleCase(str) {
      var strSplit = str.split('');
      strSplit[0] = strSplit[0].toUpperCase();

      return strSplit.join('');
    }
  }

}());

(function() {
  'use strict';

  angular.module('transport')
  .controller('RailViewController', RailViewController);

  RailViewController.$inject = ['RailViewService','MetroLineService'];

  /**
  * Controller that passes information from the  injected service into the html
  * @param {Service} RailViewService Service Injected with the http requests
  * @param {Service} MetroLineService Service Injected with the onject model filtering functions
  * @return {void}
  */
  function RailViewController(RailViewService,MetroLineService) {

    var vm = this;
    this.delayFailureMessage = false;
    this.delayMessage = true;
    this.noDelayMessage = false;
    this.parkingErrorMessage = false;
    this.stationIncidentErrorMessage = false;
    this.toggleCommuteInfo = false;
    this.toggleClose = true;
    this.stationToStationError = false;
    this.trainPositionError = false;
    this.trainPosition = [];
    this.liveTrainLocation = {};
    this.incidents = [];
    this.railIncident = [];
    this.railParking = [];
    this.distance = {};
    this.liveTrains = {};
    this.position = [];
    this.stationNames = {};
    this.liveTrainsCode = {};

    this.toggleMetroInfo = function toggleMetroInfo() {
      vm.toggleClose = true;
    };

    this.toggleDelayInfo = function toggleDelayInfo() {
      vm.delayMessage = true;
      vm.noDelayMessage = false;
    };

    this.railInfo = function railInfo(){

      RailViewService.railInfo()
      .then(function success(data) {
        console.log(data.data.Incidents);
        vm.railIncident = data.data.Incidents;
        if(vm.railIncident.length === 0) {
          console.log('length', vm.railIncident.length);
          vm.noDelayMessage = 'No current Metro Delays.';
        }
        vm.delayMessage = false;
        console.log('the array', vm.railIncident);
      })
      .catch(function failure(xhr) {
        vm.delayFailureMessage = 'Failed to communicate to WMATA server: Please try again later.';
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
        vm.parkingErrorMessage = 'Failed to communicate to WMATA server: Please try again later.';
        console.error('No data for you :(', xhr);
      });
    };

    this.getIncidents = function getIncidents() {
      RailViewService.stationIncidents()
      .then(function success(data) {
        vm.incidents = data.data.ElevatorIncidents;
        vm.toggleClose = false;
        console.log('You got it!', data.data.ElevatorIncidents);
      })
      .catch(function failure(xhr) {
        vm.stationIncidentErrorMessage = 'Failed to communicate to WMATA server: Please try again later.';
        console.log('Failed', xhr);
      });

    };

    this.getStationToStation = function getStationToStation() {
      vm.distance.start = MetroLineService.metroStationToCode(vm.stationNames.start);
      vm.distance.end = MetroLineService.metroStationToCode(vm.stationNames.end);
      RailViewService.stationDistance(vm.distance)
      .then(function success(data) {
        vm.stationToStationInfo = data.data.StationToStationInfos[0];
        vm.toggleCommuteInfo = true;
        console.log('Miles to Destination', vm.stationToStationInfo);
      })
      .catch(function failed(xhr) {
        vm.stationToStationError = 'Failed to communicate to WMATA server: Please try again later.';
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

    this.getTrainPositions = function getTrainPositions(){
      vm.liveTrainsCode.code = MetroLineService.liveTrainStationCode(vm.liveTrains.code);
      RailViewService.trainPositions(vm.liveTrainsCode.code)
      .then(function success(data) {
        vm.trainPosition = data.data.Trains;
        console.log('success', data);
      })
      .catch(function failed(xhr) {
        vm.trainPositionError = 'Failed to communicate to WMATA server: Please try again later.';
        console.log('failed', xhr);
      });
    };
  }

}());

(function() {
  'use strict';

  angular.module('transport')
    .factory('RailViewService', RailViewService);

  RailViewService.$inject = ['$http'];

  /**
   * RailViewService Constructor Function that returns all the rail related http calls
   * @param {Angular} $http Dependency Injection
   * @return {void}
   */
  function RailViewService($http) {

    var passKey = 'f44ffd8ba84f459796d5a0870957bdb7';

    return {
      railInfo: railInfo,
      railParking: railParking,
      stationIncidents: stationIncidents,
      stationDistance: stationDistance,
      trainPositions: trainPositions
    };

    /**
     * http request that returns metro delay information across all stations
     * @return {Promise}
     */
    function railInfo() {
      return $http({
        url: 'https://api.wmata.com/Incidents.svc/json/Incidents',
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'api_key': passKey
        }
      });
    }

    /**
     * http request that returns station parking information across stations
     * @return {Promise}
     */
    function railParking() {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jStationParking',
        method:'get',
        headers: {
          'content-type': 'application/json',
          'api_key': passKey
        }
      });
    }

    /**
     * http request that returns elevator/escalator incidents across all stations
     * @return {Promise}
     */
    function stationIncidents() {
      return $http({
        url: 'https://api.wmata.com/Incidents.svc/json/ElevatorIncidents',
        method: 'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

    /**
     * http request that returns the distance in miles and minutes as well as price from the stations a user inputs
     * @param  {string} distance [String modeled into the stationNames object as stationNames.start and stationNames.end]
     * @return {Promise}
     */
    function stationDistance(distance) {
      return $http({
        url:'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo',
        method: 'get',
        params: {
          FromStationCode: distance.start,
          ToStationCode: distance.end
        },
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

    /**
     * http request that returns all incoming trains to the station a user inputs.
     * @param  {String} stationCode [Information the user types in that gets modeled into liveTrains.code]
     * @return {Promise}          
     */
    function trainPositions(stationCode){
      console.log(stationCode);
      return $http({
        url: 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + stationCode,
        method:'get',
        headers: {
          'content-type':'application/json',
          'api_key': passKey
        }
      });
    }

  }

}());
