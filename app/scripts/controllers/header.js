'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('HeaderCtrl', function ($scope, $location, appSession) {
    $scope.logout = function() {
      // Logout the user from the appSession
      appSession.logout();

      // Redirect the user to the signin page
      $location.path('/signin');
    };
  });
