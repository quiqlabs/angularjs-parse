'use strict';

angular.module('parseAngularjsTodolistApp')
  .factory('appSession', function ($cookies, $rootScope) {
    // Public API here
    return {
      getUser: function() {
        if ($cookies.currentUser) {
          $rootScope.currentUser = JSON.parse($cookies.currentUser);
        }

        return $rootScope.currentUser;
      },

      setUser: function(user) {
        $rootScope.currentUser = user;

        // Save the user on the cookies store
        if (user) {
          $cookies.currentUser = JSON.stringify(user);
        }
        else {
          delete $cookies.currentUser;
        }
      },

      logout: function() {
        this.setUser(null);
      }
    };
  });
