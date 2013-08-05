'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('SignupCtrl', function ($scope, $location, userService) {
    $scope.userData = {
      username: 'WilliamLepinski',
      password: 'william',
      name: 'William Lepinski',
      email: 'willsp@gmail.com'
    };

    $scope.trySignup = function() {
      userService.signup($scope.userData)
        .then(function(){
          $location.path('/signin');
        });
    };
  });
