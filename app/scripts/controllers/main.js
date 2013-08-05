'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('MainCtrl', function ($scope, task) {
    $scope.tasks = [];

    var getTasks = function() {
      task.list()
        .then(function(tasks){
          $scope.tasks = $scope.tasks.concat(tasks);
        });
    };

    $scope.createTask = function() {
      task.create({ name: this.newTask })
        .then(function(task){
          $scope.tasks.push(task);
          $scope.newTask = null;
        });
    };

    $scope.removeTask = function(taskToRemove) {
      task.remove(taskToRemove)
        .then(function(){
          var filtered = $scope.tasks.indexOf(taskToRemove);
          $scope.tasks.splice(filtered, 1);
        });
    };

    getTasks();
  });
