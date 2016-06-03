SecretsIndexController.$inject = ["$http", "$location", '$scope']; // minification protection
function SecretsIndexController ($http, $location, $scope) {
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

  vm.markerClick = function(secret) {
    console.log(secret._id);
    $location.url('/secrets/' + secret._id);
    $scope.$apply();
  };

  vm.markerOptions = {icon: 'images/images.png'};
  // map config
  vm.mapCenter = { latitude: 37.7749, longitude: -122.4194 };
  vm.mapZoom = 12;
  vm.mapOptions = {
    styles:[
      {
        stylers:[
          {hue: '#003366'},
          {gamma: 0.12}
        ]
      }
    ]
  };
}
