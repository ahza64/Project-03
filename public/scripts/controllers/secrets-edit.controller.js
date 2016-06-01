SecretsEditController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function SecretsEditController ($location, $http, $routeParams) {
  var vm = this;
  vm.update = update;
  vm.destroy = destroy;
  vm.secret = {}; // form data

  var id = $routeParams.id;
  get(); // fetch one post (show)

  ////

  function update() {
    console.log("updating a location");
    var address = vm.secret.location;
    //please accept the information from google, thanks man!
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address + '&key=AIzaSyArJRzc4s49N8ikvOh3ziAehwi9SLRDYgE',
      success: function(_results) {
        console.log(_results);
        // vm.queryResults = _results.results;
        vm.geodata = _results.results[0].geometry.location;

        vm.secret.latitude = vm.geodata.lat;
        vm.secret.longitude = vm.geodata.lng;

      $http
        .put('/api/secrets/' + id, vm.secret)
        .then(onUpdateSuccess, onUpdateError);
      }
    });


    function onUpdateSuccess(response){
      $location.path("/secrets/" + id);
    }

    function onUpdateError(response){
      console.error("Failed to revision secret", response);
    }
  }

  function destroy() {
    $http
      .delete('/api/secrets/' + id)
      .then(onDeleteSuccess, onDeleteError);

    function onDeleteSuccess(response){
      $location.path("/");
    }

    function onDeleteError(response){
      console.error("Failed to erase secret", response);
    }
  }

  function get() {
    $http
      .get('/api/secrets/' + id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response){
      vm.secret = response.data;
    }

    function onGetError(response){
      console.error("Failed to get secret", response);
      $location.path("/");
    }
  }
}
