SecretsNewController.$inject = ["$location", "$http"]; // minification protection
function SecretsNewController ($location, $http) {
  var vm = this;
  vm.create = create;
  vm.secret = {}; // form data

  ////

  function create() {
    $http
      .post('/api/secrets', vm.secret)
      .then(onCreateSuccess, onCreateError);

    function onCreateSuccess(response){
      $location.path('/secrets/' + response.data._id);
    }

    function onCreateError(response){
      console.error("Failed to expose secret", response);
    }
  }
}
