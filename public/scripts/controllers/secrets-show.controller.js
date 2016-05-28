SecretsShowController.$inject = ["$location", "$http", "$routeParams"]; // minification protection
function SecretsShowController ($location, $http, $routeParams) {
  var vm = this;
  vm.secret = {};

  var id = $routeParams.id;
  get(); // fetch one post (show)

  ////

  function get() {
    $http
      .get('/api/secrets/' + id)
      .then(onGetSuccess, onGetError);

    function onGetSuccess(response){
      vm.secret = response.data;
    }

    function onGetError(response){
      console.error("Failed to get the secret", response);
      $location.path("/");
    }
  };
}
