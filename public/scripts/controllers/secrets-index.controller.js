SecretsIndexController.$inject = ["$http", "$scope"]; // minification protection
function SecretsIndexController ($http, $scope) {
  var vm = this;
  vm.secrets = [];

  query(); // fetch all the posts (index)

  ////

  function query() {
    $http
      .get('/api/secrets')
      .then(function onSuccess(response) {
        vm.secrets = response.data;
      });
  }

    // map config
    vm.mapCenter = { latitude: 37.7749, longitude: -122.4194 };
    vm.mapZoom = 13;


    var address ="1334 Emerson St, NE Washington DC";

    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address + '&key=AIzaSyArJRzc4s49N8ikvOh3ziAehwi9SLRDYgE')
      .then(function(_results){
        vm.queryResults = _results.data.results;
        vm.geodata = vm.queryResults[0].geometry.location;
        console.log(vm.geodata);
        vm.secretMarker.push({id: 86, latitude: vm.geolat, longitude: vm.geolng});

      },
      function error(_error){
        vm.queryError = _error;
      });
      vm.geodata = {};
      vm.geolat = vm.geodata.lat;
      vm.geolng = vm.geodata.lng;
      vm.queryResults = {};
      vm.queryError = {};
      vm.secretMarker = [];



    // goat retrieval department
    // var baseUrl = 'http://goats-api.herokuapp.com';
    // fetchAllGoats();  // fetch goats on start
    //
    // function fetchAllGoats() {
    //   $http({
    //     method: 'GET',
    //     url: baseUrl + '/api/goats'
    //   }).then(function successCallback(response) {
    //     console.log('goats received: ', response);
    //     vm.goats = response.data;
    //   }, function errorCallback(response) {
    //     console.log('There was an error getting the data', response);
    //   });
    // }
  // }

}
