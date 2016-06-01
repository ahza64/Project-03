SecretsNewController.$inject = ["$location", "$http"]; // minification protection
function SecretsNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.secret = {}; // form data

  ////

  function create() {
    console.log("creating a location");
    var address = vm.secret.location;

    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address + '&key=AIzaSyArJRzc4s49N8ikvOh3ziAehwi9SLRDYgE',{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(function(_results){
        console.log("lat/lng in secret object?");
        vm.queryResults = _results.data.results;
        vm.geodata = vm.queryResults[0].geometry.location;

        vm.secret.latitude = vm.geodata.lat;
        vm.secret.longitude = vm.geodata.lng;

        // vm.secretMarker = [];
        // vm.secretMarker.push({id: 86, latitude: vm.geolat, longitude: vm.geolng});
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
