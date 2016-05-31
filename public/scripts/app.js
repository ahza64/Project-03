var app = angular
  .module('SFsecrets', [
    'ngRoute',
    'satellizer'
  ])
  .controller('MainController', MainController)
  .controller('SecretsIndexController', SecretsIndexController)
  .controller('SecretsNewController', SecretsNewController)
  .controller('SecretsShowController', SecretsShowController)
  .controller('SecretsEditController', SecretsEditController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .service('UserService', UserService)
  .config(configRoutes);

  (function () {

      // var app = angular.module('SFsecrets', []);

      // common service module to return rootScope
      app.factory('common', ['$rootScope', function ($rootScope) {
          return {
              rootScope: $rootScope
          };
      }]);

      // main application controller.
      // when new markers are added, the controller notifies the directive to update the map

      app.controller('MainCtrl', ['common', function (common) {
          var vm = this;
          vm.message = 'Click to add map markers';
          vm.downtownLocation = [37.7749, -122.4194];
          vm.markers = [];

          vm.addMarker = function () {

              var newMarkerLocation = [vm.downtownLocation[0], vm.downtownLocation[1]];
              newMarkerLocation[0] += (Math.random() > 0.5 ? -Math.random() / 100 : Math.random() / 100);
              newMarkerLocation[1] += (Math.random() > 0.5 ? -Math.random() / 100 : Math.random() / 100);

              vm.markers.push(newMarkerLocation);
              common.rootScope.$broadcast('markerAdded', newMarkerLocation);

          };


      }]);


      // controller associated with the map directive
      // maintains an internal list of markers on the map
      app.controller('mapDirectiveController', ['$scope', function ($scope) {

          var self = this;
          self.map;
          self.mapMarkers = [];
          self.init = function (map) {
              self.map = map;
              self.setMarker({ key: '', location: [37.7749, -122.4194] });
              $scope.$on('markerAdded', function (event, args) {

                  console.log('marker added event caught ' + args);

                  self.setMarker({ key: '', location: args });

              });

          };

          self.setMarker = function (markerLocation) {

              var location = markerLocation.location;
              var key = markerLocation.key;

              if (location.length === 0)
                  return;

              var marker = new google.maps.Marker({
                  icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  position: new google.maps.LatLng(location[0], location[1]),
                  optimized: true,
                  map: self.map

              });

          };

      }]);

      // map directive. initializes the map DOM element
      // off loads marker and event handling methods to the directive controller
      app.directive('mapDirective', mapDirective);

      function mapDirective() {
          return {
              restrict: 'E',
              controller: 'mapDirectiveController',
              template: '<div id="mapSize"></div>',
              link: function (scope, elem, attrs, ctrl) {
                  var map;
                  map = new google.maps.Map(elem[0], {
                      center: new google.maps.LatLng(37.7749, -122.4194),
                      zoom: 12,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                  });

                  ctrl.init(map);

              },
              replace: true

          };

      }


  })();
