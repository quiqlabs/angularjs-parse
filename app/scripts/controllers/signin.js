'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('SigninCtrl', function ($scope, userService, appSession) {
    $scope.credentials = {
      username: 'WilliamLepinski',
      password: 'william'
    };

    $scope.trySignin = function() {
      userService.signin($scope.credentials.username, $scope.credentials.password)
        .then(function(loggedUser){
          console.log(arguments);
          appSession.user = loggedUser;
        }, function(error){
          $scope.signinError = error;
        });
    };
  });
