SecretsNewController.$inject = ["$location", "$http"]; // minification protection
function SecretsNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.secret = {}; // form data

  ////


  function create() {
    console.log("creating a location");
    var address = vm.secret.location;

    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address + '&key=AIzaSyArJRzc4s49N8ikvOh3ziAehwi9SLRDYgE',
      success: function(_results) {
        console.log(_results);
        vm.geodata = _results.results[0].geometry.location;
        vm.secret.latitude = vm.geodata.lat;
        vm.secret.longitude = vm.geodata.lng;

        $http
          .post('/api/secrets', vm.secret)
          .then(onCreateSuccess, onCreateError);
      }
    });

    function onCreateSuccess(response){
      $location.path('/secrets/' + response.data._id);
    }

    function onCreateError(response){
      console.error("Failed to expose secret", response);
    }
  }
}
