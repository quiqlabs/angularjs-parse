'use strict';

angular.module('parseAngularjsTodolistApp')
  .factory('userService', function ($q, $http, utilsService) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      signin: function (username, password) {
        return utilsService.getPromise({
          method: 'GET',
          url: 'https://api.parse.com/1/login',
          params: {
            username: username,
            password: password
          }
        });
      },

      signup: function(userData) {
        return utilsService.getPromise({
          method: 'POST',
          url: 'https://api.parse.com/1/users',
          data: userData
        });
      }
    };
  });
