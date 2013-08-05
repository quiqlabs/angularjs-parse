'use strict';

angular.module('parseAngularjsTodolistApp')
  .factory('task', function ($http, $q) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      list: function () {
        var defer = $q.defer();
        var req = $http({ method: 'GET', url: 'https://api.parse.com/1/classes/task' });
        req.success(function(){
          defer.resolve.apply(this, arguments);
        });

        return defer.promise;
      },

      get: function (id) {
        var defer = $q.defer();
        var req = $http({ method: 'GET', url: 'https://api.parse.com/1/classes/task/' + id });
        req.success(function(){
          defer.resolve.apply(this, arguments);
        });

        return defer.promise;
      },

      remove: function (task) {
        var defer = $q.defer();
        var req = $http({ method: 'DELETE', url: 'https://api.parse.com/1/classes/task/' + task.objectId });
        req.success(function(){
          defer.resolve.apply(this, arguments);
        });

        return defer.promise;
      },

      create: function(task) {
        var self = this;
        var defer = $q.defer();
        var req = $http({ method: 'POST', url: 'https://api.parse.com/1/classes/task', data: task });
        req.success(function(data){
          self.get(data.objectId)
            .then(function(data){
              defer.resolve.apply(this, arguments);
            });
        });

        return defer.promise;
      }
    };
  });
