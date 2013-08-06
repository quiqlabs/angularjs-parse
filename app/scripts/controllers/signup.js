'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('SignupCtrl', function ($scope, $location, userService) {
    $scope.userData = {
      username: '',
      password: '',
      name: '',
      email: ''
    };

    $scope.trySignup = function() {
      userService.signup($scope.userData)
        .then(function(){
          $location.path('/signin');
        });
    };
  });
