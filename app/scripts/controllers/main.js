'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('MainCtrl', function ($scope, taskService) {
    $scope.tasks = [];

    var getTasks = function() {
      taskService.list()
        .then(function(tasks){
          $scope.tasks = $scope.tasks.concat(tasks);
        });
    };

    $scope.createTask = function() {
      taskService.create({ name: this.newTask })
        .then(function(task){
          $scope.tasks.unshift(task);
          $scope.newTask = null;
        });
    };

    getTasks();
  });
