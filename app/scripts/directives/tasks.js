'use strict';

angular.module('parseAngularjsTodolistApp')
  .controller('tasksDirectiveCtrl', function($scope, $filter, taskService){
    this.removeTask = function(taskToRemove) {
      taskService.remove(taskToRemove)
        .then(function(){
          var filtered = $scope.tasks.indexOf(taskToRemove);
          $scope.tasks.splice(filtered, 1);
        });
    };

    this.editMode = function (active) {
      // if (active) {
      //   this.allTasks = $scope.tasks;
      //   $scope.tasks = $filter('filter')(this.allTasks, { editing: true });
      // }
      // else {
      //   $scope.tasks = this.allTasks;
      // }
    };
  })
  .directive('tasks', function () {
    return {
      restrict: 'A',
      controller: 'tasksDirectiveCtrl',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the tasks directive');
      }
    };
  });
