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

    // map config
    vm.mapCenter = { latitude: 37.7749, longitude: -122.4194 };
    vm.mapZoom = 13;

    // goat retrieval department
    // var baseUrl = 'http://goats-api.herokuapp.com';
    vm.secrets = [{id: 86, latitude: 37.7949, longitude: -122.4094}];
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
