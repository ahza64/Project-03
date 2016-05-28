angular
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
  .config(configRoutes)
  ;
