SecretsNewController.$inject = ["$location", "$http"]; // minification protection
function SecretsNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.secret = {}; // form data

  ////

  function create() {
    console.log("creating a location");
    var address ="1334 Emerson St, NE Washington DC";

    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address + '&key=AIzaSyArJRzc4s49N8ikvOh3ziAehwi9SLRDYgE')
      .then(function(_results){
        vm.queryResults = _results.data.results;
        vm.geodata = vm.queryResults[0].geometry.location;
        console.log(vm.geodata);
        vm.secretMarker.push({id: 86, latitude: vm.geolat, longitude: vm.geolng});
        vm.geodata = {};
        vm.geolat = vm.geodata.lat;
        vm.geolng = vm.geodata.lng;
        vm.queryResults = {};
        vm.queryError = {};
        vm.secretMarker = [];

      $http
        .post('/api/secrets', vm.secret)
        .then(onCreateSuccess, onCreateError);

      },
      function error(_error){
        vm.queryError = _error;
      });


    function onCreateSuccess(response){
      $location.path('/secrets/' + response.data._id);
    }

    function onCreateError(response){
      console.error("Failed to expose secret", response);
    }
  }
}
