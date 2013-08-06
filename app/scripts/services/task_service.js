'use strict';

angular.module('parseAngularjsTodolistApp')
  .factory('taskService', function ($http, $q, utilsService, appSession) {
    // Public API here
    return {
      list: function () {
        return utilsService.getPromise({
          method: 'GET',
          params: {
            'order': '-score'
          },
          url: 'https://api.parse.com/1/classes/task'
        });
      },

      get: function (id) {
        return utilsService.getPromise({
          method: 'GET',
          url: 'https://api.parse.com/1/classes/task/' + id
        });
      },

      update: function(task) {
        return utilsService.getPromise({
          method: 'PUT',
          data: task,
          url: 'https://api.parse.com/1/classes/task/' + task.objectId
        });
      },

      remove: function (task) {
        return utilsService.getPromise({
          method: 'DELETE',
          url: 'https://api.parse.com/1/classes/task/' + task.objectId
        });
      },

      create: function(task) {
        var self = this;
        var defer = $q.defer();

        var createPromise = utilsService.getPromise({
          method: 'POST',
          url: 'https://api.parse.com/1/classes/task',
          data: task
        });

        createPromise.then(function(task){
          self.get(task.objectId)
            .then(function(){
              defer.resolve.apply(this, arguments);
            });
        });

        return defer.promise;
      }
    };
  });
