SecretsIndexController.$inject = ["$http"]; // minification protection
function SecretsIndexController ($http) {
  var vm = this;
  vm.secrets = [];

  query(); // fetch all the secrets (index)

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
    vm.mapZoom = 12;
    vm.markerOptions = {icon: 'images/images.png'};
    vm.mapOptions = {
      styles:[
        {
          stylers:[
            {hue: '#003366'},
            {gamma: 0.12},
          ]
        }
      ]
    };
}
