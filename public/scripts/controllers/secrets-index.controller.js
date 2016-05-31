SecretsIndexController.$inject = ["$http"]; // minification protection
function SecretsIndexController ($http) {
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
}
