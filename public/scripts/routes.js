configRoutes.$inject = ["$routeProvider", "$locationProvider"]; // minification protection
function configRoutes($routeProvider, $locationProvider) {

  //this allows us to use routes without hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
      templateUrl: 'templates/secrets/index.html',
      controller: 'SecretsIndexController',
      controllerAs: 'secretsIndexCtrl'
    })
    .when('/signup', {
      templateUrl: 'templates/user/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/login', {
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .when('/logout', {
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/secrets', {
      templateUrl: 'templates/secrets/index.html',
      controller: 'SecretsIndexController',
      controllerAs: 'secretsIndexCtrl'
    })
    .when('/secrets/new', {
      templateUrl: 'templates/secrets/new.html',
      controller: 'SecretsNewController',
      controllerAs: 'secretsNewCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .when('/secrets/:id', {
      templateUrl: 'templates/secrets/show.html',
      controller: 'SecretsShowController',
      controllerAs: 'secretsShowCtrl'
    })
    .when('/secrets/:id/edit', {
      templateUrl: 'templates/secrets/edit.html',
      controller: 'SecretsEditController',
      controllerAs: 'secretsEditCtrl',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .otherwise({redirectTo: '/'});


    function skipIfLoggedIn($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }

}
