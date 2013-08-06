'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('SigninCtrl', function ($scope, $cookies, $location, userService, appSession) {
    $scope.credentials = {
      username: 'wlepinski',
      password: 'william'
    };

    $scope.trySignin = function() {
      userService.signin($scope.credentials.username, $scope.credentials.password)
        .then(function(loggedUser){
          if (loggedUser.emailVerified) {
            // Save the user on the appSession.user variable
            appSession.setUser(loggedUser);

            // Redirect the user to the dashboard
            $location.path('/');
          }
          else {
            $scope.signinError = 'User not verified';
          }
        }, function(error){
          $scope.signinError = error.error;
        });
    };
  });
